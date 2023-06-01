import { REACT_APP_ENV } from '@/contracts/chains'
import ETH_ICON from '@/assets/token/ETH.svg'
import ETH_MIN from '@/assets/token/Ethereum-min.svg'
import BNB_ICON from '@/assets/token/BNB.svg'
import BNB_MIN from '@/assets/token/Binance-min.svg'

interface listTypes {
  name: string
  icon: string
  chainId: any
  image: string
  fullName: string
  backgroundImage: string
}

export const NTTWORK_ENV: { [env: string]: listTypes[] } = {
  dev: [
    {
      name: 'Kovan',
      fullName: 'Kovan Testnet',
      icon: ETH_ICON,
      image: ETH_MIN,
      chainId: 42,
      backgroundImage: 'linear-gradient(to right,#495EFC,#3F84EE)',
    },
    {
      name: 'Binance',
      fullName: 'BNB Smart Chain Testnet',
      icon: BNB_ICON,
      image: BNB_MIN,
      chainId: 97,
      backgroundImage: 'linear-gradient(to right,#3E3F47,#525961)',
    },
  ],
  uat: [
    {
      name: 'Goerli',
      fullName: 'Goerli Testnet',
      icon: ETH_ICON,
      image: ETH_MIN,
      chainId: 5,
      backgroundImage: '',
    },
    // {
    //   name: 'Kovan',
    //   fullName: 'Kovan Testnet',
    //   icon: ETH_ICON,
    //   image: ETH_MIN,
    //   chainId: 42,
    //   backgroundImage: 'linear-gradient(to right,#495EFC,#3F84EE)',
    // },
    // {
    //   name: 'Binance',
    //   fullName: 'BNB Smart Chain Testnet',
    //   icon: BNB_ICON,
    //   image: BNB_MIN,
    //   chainId: 97,
    //   backgroundImage: 'linear-gradient(to right,#3E3F47,#525961)',
    // },
  ],
  prd: [
    {
      name: 'Ethereum',
      fullName: 'Ethereum Mainnet',
      icon: ETH_ICON,
      image: ETH_MIN,
      chainId: 1,
      backgroundImage: '',
    },
    // {
    //   name: 'BNB Chain',
    //   fullName: 'Binance Smart Chain',
    //   icon: BNB_ICON,
    //   image: BNB_MIN,
    //   chainId: 56,
    //   backgroundImage: 'linear-gradient(to right,#3E3F47,#525961)',
    // },
  ],
}

export const NTTWORKS: listTypes[] = NTTWORK_ENV[REACT_APP_ENV]
