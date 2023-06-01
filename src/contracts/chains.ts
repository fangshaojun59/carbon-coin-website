import type { AddEthereumChainParameter } from '@web3-react/types'

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else return chainId
}

export const REACT_APP_ENV = process.env.REACT_APP_ENV || 'uat'

export const CHAINS_ENV: any = {
  dev: {
    42: {
      urls: [process.env.REACT_APP_INFURAID ? `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURAID}` : undefined].filter(
        (url) => url !== undefined,
      ),
      name: 'Kovan',
    },
    97: {
      urls: ['https://data-seed-prebsc-2-s3.binance.org:8545'].filter((url) => url !== undefined),
      name: 'BNB Smart Chain Testnet',
      nativeCurrency: BNB,
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
  },
  uat: {
    5: {
      urls: [process.env.REACT_APP_INFURAID ? `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURAID}` : undefined].filter(
        (url) => url !== undefined,
      ),
      name: 'Goerli',
    },
    // 42: {
    //   urls: [process.env.REACT_APP_INFURAID ? `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURAID}` : undefined].filter(
    //     (url) => url !== undefined,
    //   ),
    //   name: 'Kovan',
    // },
    // 97: {
    //   urls: ['https://data-seed-prebsc-2-s3.binance.org:8545'].filter((url) => url !== undefined),
    //   name: 'BNB Smart Chain Testnet',
    //   nativeCurrency: BNB,
    //   blockExplorerUrls: ['https://testnet.bscscan.com'],
    // },
  },
  prd: {
    1: {
      urls: [
        process.env.REACT_APP_INFURAID ? `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURAID}` : undefined,
        'https://cloudflare-eth.com',
      ].filter((url) => url !== undefined),
      name: 'Mainnet',
    },
    // 56: {
    //   urls: ['https://bsc-dataseed1.binance.org'].filter((url) => url !== undefined),
    //   name: 'BNB Smart Chain Mainnet',
    //   nativeCurrency: BNB,
    //   blockExplorerUrls: ['https://bscscan.com'],
    // },
  },
}

export const CHAINS: any = CHAINS_ENV[REACT_APP_ENV]

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls

  if (validURLs.length) accumulator[Number(chainId)] = validURLs

  return accumulator
}, {})
