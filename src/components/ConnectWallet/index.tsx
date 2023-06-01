import { memo, useRef, useEffect, useState } from 'react'
import { ConnectWalletWrapper, ModalTitle, AddressTitle } from './styled'
import { Button, Modal, Col, Divider, Image, Spin, message, Drawer } from 'antd'
import { useBoolean } from 'ahooks'
import { ModalContentRow } from '@/common/styled'
import { modalLayout, drawerLayout } from '@/common/antd.cus'
import { WALLETS } from '@/contracts/wallets'
import { NTTWORKS } from '@/contracts/networks'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect } from '@web3-react/walletconnect'
import { useSelector, useDispatch } from 'react-redux'
import { SaveIsLogin, SaveWallet, selectWalletInfo, SaveNetwork } from '@/store/wallet'
import { SaveAddress, selectAddress } from '@/store/user'
import { useWeb3React } from '@web3-react/core'
import { CheckCircleFilled, WalletOutlined, LoginOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { formatStrAddress, Adapth5 } from '@/utils'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import MetaMaskPage from '@/components/ConnectWallet/metaMask'
import WalletConnectPage from '@/components/ConnectWallet/walletConnect'
import { getErrorMessage } from '@/hooks/useErrorHooks'
import { hooks as hooksMetamask, metaMask } from '@/connectors/metaMask'
import { hooks as hooksWalletConnect, walletConnect } from '@/connectors/walletConnect'
import { ChainIdNotAllowedError } from '@web3-react/store'
import { useCountDown, useInterval, useMount } from 'ahooks'
import { UseWatchWalletConnectConnect, UseWatchInjectedConnect } from '@/hooks/useWeb3ProviderHooks'
import { useTranslation } from 'react-i18next'

interface OnConnectType {
  connector: MetaMask | WalletConnect
  status: 'Injected' | 'WalletConnect' | string
}

const initInterval = 1200

export default memo(function ConnectWalletPages() {
  const { isActive, connector } = useWeb3React()
  const { windowSize } = useWindowSizeHooks()
  const { t } = useTranslation()
  const navigate = useNavigate()
  // @ts-ignore
  const { ethereum } = window
  const dispatch = useDispatch()
  const myAddress = useSelector(selectAddress)
  const walletInfo = useSelector(selectWalletInfo)

  const [onShow, setOnShow] = useBoolean(false)
  const [loading, setLoading] = useBoolean(false)
  const modalRef = useRef<any>(null)

  const errorWallet = hooksWalletConnect.useError()
  const isActiveWallet = hooksWalletConnect.useIsActive()

  const errorMetamask = hooksMetamask.useError()

  const [interval, setInterval] = useState<number | undefined>(undefined)

  const walletConnectClose = () => {
    void walletConnect.deactivate()
    void setLoading.setFalse()
    void setOnShow.setFalse()
    setInterval(undefined)
  }

  const [isWalletDome, setIsWalletDome] = useState<boolean>(false)
  const clearInterval = useInterval(() => {
    const walletconnectDom = document.getElementById('walletconnect-wrapper')
    if (walletconnectDom && !isWalletDome) setIsWalletDome(true)
    if (walletconnectDom === null && isWalletDome) {
      if (isActive) {
        void clearInterval
        setInterval(undefined)
        return false
      }
      void walletConnectClose()
      message.error({
        content: 'User denied authorization',
        className: 'message-global',
      })
      void clearInterval
    }
  }, interval)

  const [targetDate, setTargetDate] = useState<number>()
  // eslint-disable-next-line
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      void walletConnectClose()
      void clearInterval
    },
  })

  useMount(() => {
    const walletconnectDom = document.getElementById('walletconnect-wrapper')
    if (walletconnectDom !== null) setInterval(initInterval)
    else {
      void clearInterval
      setInterval(undefined)
    }
  })

  useEffect(() => {
    if (isActive) {
      connector instanceof MetaMask && onConnectSuccess({ connector, status: 'Injected' })
      connector instanceof MetaMask && UseWatchInjectedConnect({ dispatch })
      connector instanceof WalletConnect && onConnectSuccess({ connector, status: 'WalletConnect' })
      connector instanceof WalletConnect && UseWatchWalletConnectConnect({ provider: connector.provider, dispatch })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  useEffect(() => {
    isActiveWallet && setTargetDate(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveWallet])

  useEffect(() => {
    errorMetamask && loginErrorMetamask()
    errorWallet && loginErrorWallet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMetamask, errorWallet])

  const loginErrorWallet = async () => {
    console.log('errorWallet', errorWallet)
    void clearInterval
    setInterval(undefined)
    let msg = await getErrorMessage(errorWallet)
    if (errorWallet instanceof ChainIdNotAllowedError) {
      message.warning({
        content: `${msg}. Please switch within 10s`,
        className: 'message-global',
      })
      setTargetDate(Date.now() + 10000)
    } else {
      message.warning({
        content: msg,
        className: 'message-global',
      })
      void walletConnectClose()
    }
  }

  const loginErrorMetamask = async () => {
    console.log('errorMetamask', errorMetamask)
    let msg = await getErrorMessage(errorMetamask)
    if (msg === 'MetaMask: Disconnected from chain. Attempting to connect.') {
      void metaMask.connectEagerly()
      return false
    }
    void metaMask.deactivate()
    message.error({
      content: msg,
      className: 'message-global',
    })
    void setLoading.setFalse()
  }

  const loginOut = async () => {
    void connector.deactivate()
    dispatch(SaveIsLogin(false))
    dispatch(SaveAddress(''))
    dispatch(SaveWallet('NetWork'))
    localStorage.removeItem('isLogin')
    localStorage.removeItem('wallet')
    message.info({
      content: t('app.loginout'),
      className: 'message-global',
    })
    navigate('/home', { replace: true })
  }

  const onConnectSuccess = async ({ status }: OnConnectType) => {
    void setLoading.setFalse()
    dispatch(SaveIsLogin(true))
    dispatch(SaveWallet(status))
    localStorage.setItem('wallet', status)
    localStorage.setItem('isLogin', 'true')
    if (!onShow) return
    message.success({
      content: t('app.succ'),
      className: 'message-global',
    })
    void setOnShow.setFalse()
  }

  const switchNetWork = (str: any) => {
    localStorage.setItem('chainId', str)
    dispatch(SaveNetwork(str))
  }

  const ConnectWalletListPages = () => (
    <ModalContentRow>
      <Col span={2} className="center">
        <div className="number">1</div>
      </Col>
      <Col span={22}>
        <ModalTitle>Choose Network</ModalTitle>
      </Col>
      <Col span={22} offset={2}>
        <ModalContentRow>
          {NTTWORKS.map((item, index) => (
            <Col className="choose-info" key={index} span={8} md={{ span: 6 }} onClick={() => switchNetWork(item.chainId)}>
              <Image width="3.75rem" height="3.75rem" src={item.icon} preview={false} />
              <span className="choose-span">{item.name}</span>
              {item.chainId === walletInfo.network && (
                <div className="choose-icon">
                  <CheckCircleFilled />
                </div>
              )}
            </Col>
          ))}
        </ModalContentRow>
      </Col>
      <Col span={2} className="center">
        <div className="number">2</div>
      </Col>
      <Col span={22}>
        <ModalTitle>Choose Wallet</ModalTitle>
      </Col>
      <Col span={22} offset={2}>
        <ModalContentRow>
          {WALLETS.filter((item) => {
            if (!ethereum) return item.name !== 'Metamask'
            return true
          }).map((item, index) => (
            <Col span={8} md={{ span: 6 }} key={index}>
              {item.link === 'Injected' && (
                <MetaMaskPage item={item} setLoading={(s) => (!s ? void setLoading.setFalse() : void setLoading.setTrue())} />
              )}
              {item.link === 'WalletConnect' && (
                <WalletConnectPage
                  item={item}
                  setLoading={(s) => {
                    if (!s) {
                      void setLoading.setFalse()
                      void clearInterval
                      setInterval(undefined)
                    } else {
                      void setLoading.setTrue()
                      setInterval(initInterval)
                    }
                  }}
                />
              )}
            </Col>
          ))}
        </ModalContentRow>
      </Col>
    </ModalContentRow>
  )

  return (
    <ConnectWalletWrapper>
      {!isActive && (
        <>
          {windowSize.innerWidth > Adapth5 ? (
            // <Button type="primary" className="wallet-connect-btn" onClick={setOnShow.toggle}>
            //   Connect Wallet
            // </Button>
            <div className="wallet-connect" onClick={setOnShow.toggle}>
              {t('app.link.btn')}
            </div>
          ) : (
            <Button type="primary" shape="circle" className="wallet-connect-btn-h5" icon={<WalletOutlined />} onClick={setOnShow.toggle} />
          )}
        </>
      )}
      {isActive && (
        <AddressTitle onClick={loginOut} type="text" icon={<LoginOutlined />}>
          {formatStrAddress(4, 4, myAddress)}
        </AddressTitle>
      )}
      {windowSize.innerWidth > Adapth5 ? (
        <Modal {...modalLayout} visible={onShow} getContainer={modalRef.current} onCancel={setOnShow.setFalse}>
          <Spin tip="Loading..." spinning={loading}>
            <h1>Choose a connection method</h1>
            <Divider dashed />
            <ConnectWalletListPages />
          </Spin>
        </Modal>
      ) : (
        <Drawer
          {...drawerLayout}
          getContainer={modalRef.current}
          visible={onShow}
          onClose={setOnShow.setFalse}
          title="Choose a connection method"
        >
          <ConnectWalletListPages />
        </Drawer>
      )}
    </ConnectWalletWrapper>
  )
})
