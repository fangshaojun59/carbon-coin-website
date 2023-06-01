import React, { memo, createContext, useEffect, useState } from 'react'
import { useWeb3React, Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask'
import { hooks as networkHooks, network } from '@/connectors/network'
import { hooks as walletConnectHooks, walletConnect } from '@/connectors/walletConnect'
import { useEagerConnect } from '@/hooks/useWeb3ProviderHooks'
import { SaveAddress } from '@/store/user'
import { useDispatch, useSelector } from 'react-redux'
import { selectWalletInfo } from '@/store/wallet'
import PagesProvider from '@/components/PagesProvider'
import { URLS } from '@/contracts/chains'
import { DEFAULT_CHAINID, getActiveChainId } from '@/contracts/constant'
import { ConstantInit } from '@/contracts/constant.init'

export interface DataContext {
  data?: typeof ConstantInit
  blockNumber: number | undefined
}

export const Context = createContext<DataContext>({
  data: undefined,
  blockNumber: undefined,
})

const connectors: [MetaMask | WalletConnect | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [network, networkHooks],
]

export default memo(({ children }: any) => (
  <Web3ReactProvider connectors={connectors}>
    <Web3ProviderPages children={children} />
  </Web3ReactProvider>
))

const Web3ProviderPages = ({ children }: any) => {
  const { account, provider, chainId } = useWeb3React()
  const dispatch = useDispatch()
  const walletInfo = useSelector(selectWalletInfo)
  const chainIds = Object.keys(URLS)

  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined)

  const [data, setData] = useState<any>(() => {
    let isTrue = getActiveChainId(chainIds, walletInfo.network)
    return new ConstantInit(
      (provider as any)?.provider || URLS[!isTrue ? DEFAULT_CHAINID : walletInfo.network][0],
      !isTrue ? DEFAULT_CHAINID : walletInfo.network,
    )
  })

  // @ts-ignore
  window.data = data

  useEagerConnect(walletInfo.wallet, walletInfo)

  useEffect(() => {
    if (account) dispatch(SaveAddress(account))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  useEffect(() => {
    let isTrue = getActiveChainId(chainIds, walletInfo.network)
    provider
      ? setData(new ConstantInit((provider as any).provider, !isTrue ? DEFAULT_CHAINID : walletInfo.network))
      : setData(new ConstantInit(URLS[!isTrue ? DEFAULT_CHAINID : walletInfo.network][0], !isTrue ? DEFAULT_CHAINID : walletInfo.network))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, walletInfo.network])

  useEffect((): any => {
    if (!!provider) {
      let stale = false
      provider
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) setBlockNumber(blockNumber)
        })
        .catch(() => {
          if (!stale) setBlockNumber(undefined)
        })
      const updateBlockNumber = (blockNumber: number) => setBlockNumber(blockNumber)
      provider.on('block', updateBlockNumber)
      return () => {
        stale = true
        provider.removeListener('block', updateBlockNumber)
        setBlockNumber(undefined)
      }
    }
  }, [provider, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Context.Provider value={{ data, blockNumber }}>
      <PagesProvider>{children}</PagesProvider>
    </Context.Provider>
  )
}
