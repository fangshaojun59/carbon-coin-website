import { memo } from 'react'
import { Image, message } from 'antd'
import type { Type as WalletsType } from '@/contracts/wallets'
import { walletConnect } from '@/connectors/walletConnect'
import { getErrorMessage } from '@/hooks/useErrorHooks'
import { useSelector } from 'react-redux'
import { selectWalletInfo } from '@/store/wallet'

interface Type {
  item: WalletsType
  setLoading: (s: boolean) => void
}

export default memo(function WalletConnectPage(props: Type) {
  const { item, setLoading } = props

  const walletInfo = useSelector(selectWalletInfo)

  const switchWalletConnect = async () => {
    void setLoading(true)
    try {
      void walletConnect.activate(walletInfo.network).catch(async (error) => await onConnectError(error))
    } catch (error) {
      let msg = await getErrorMessage(error)
      message.error({
        content: msg,
        className: 'message-global',
      })
      void setLoading(false)
    }
  }

  const onConnectError = async (err: any) => {
    console.log('err', err)
    let msg = await getErrorMessage(err)
    void walletConnect.deactivate()
    message.error({
      content: msg,
      className: 'message-global',
    })
    void setLoading(false)
  }

  return (
    <div className="choose-info" onClick={switchWalletConnect}>
      <Image width="3.75rem" height="3.75rem" src={item.icon} preview={false} />
      <span className="choose-span">{item.name}</span>
    </div>
  )
})
