import { REACT_APP_ENV } from '@/contracts/chains'
import Swap from '@/contracts/abis/Swap.json'
import Token from '@/contracts/abis/Token.json'
import Cc from '@/contracts/abis/CC.json'
import usdt_icon from '@/assets/img/tether_32.png'
import centreusdc from '@/assets/img/centre-usdc_28.png'

export interface coinType {
  label: string
  value: string
  type: string
  TOKEN_ADDRESS: string
  coin: number
  url: string
}

export interface unitType {
  type: string
  value: string
}

interface ConstantChainIdType {
  Cc_ADDRESS: string
  Token_ADDRESS: string
  Swap_ADDRESS: string
  apiUrl: string
  apiKey: string
  SelectOptions: coinType[]
  unit: unitType[]
}

interface UseConstantType {
  [chainId: number]: ConstantChainIdType
}

export const DEFAULT_CHAINID_ENV: { [env: string]: number } = {
  dev: 97,
  uat: 5,
  prd: 1,
}

export const useConstant: { [env: string]: UseConstantType } = {
  dev: {
    42: {
      Cc_ADDRESS: '',
      Token_ADDRESS: '',
      Swap_ADDRESS: '0x80e6DBd53Fc53fE22Eb30Ef864f1071fC6BDe9c1',
      apiKey: '',
      apiUrl: '',
      SelectOptions: [],
      unit: [],
    },
    97: {
      Cc_ADDRESS: '',
      Token_ADDRESS: '',
      Swap_ADDRESS: '0xBf9b757FA138A17DcD2789C9b2fe32B77115A521',
      apiKey: 'https://api-testnet.bscscan.com/api',
      apiUrl: '366TDMB1M11NCFABM78212QFUM81INYK1C',
      SelectOptions: [],
      unit: [],
    },
  },
  uat: {
    5: {
      Cc_ADDRESS: '0x45D74b515dBa97de5430492845D67B5a3F23C317',
      Token_ADDRESS: '0xF1C808F4Bc8ccf839E4536A6EE893c8879e15F0d',
      Swap_ADDRESS: '0x4F41f8680faA7989e63FC41b94172DF10d590F8d',
      apiKey: '',
      apiUrl: '',
      SelectOptions: [
        {
          label: 'USDT',
          value: 'usdt',
          type: 'USDT',
          TOKEN_ADDRESS: '0xF1C808F4Bc8ccf839E4536A6EE893c8879e15F0d',
          coin: 18,
          url: usdt_icon,
        },
        {
          label: 'USDC',
          value: 'usdc',
          type: 'USDC',
          TOKEN_ADDRESS: '0xd993546682F15F669189019a0224483E328c72A1',
          coin: 6,
          url: centreusdc,
        },
      ],
      unit: [
        {
          type: 'mwei',
          value: '6',
        },
        {
          type: 'ether',
          value: '18',
        },
      ],
    },
  },
  prd: {
    1: {
      Cc_ADDRESS: '0x5d768411e77E79E3B8C133A4616734Bbd400f47c',
      Token_ADDRESS: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      Swap_ADDRESS: '0x19823d7CB068751008E4119e628db302753069aC',
      apiKey: '',
      apiUrl: '',
      SelectOptions: [
        {
          label: 'USDT',
          value: 'usdt',
          type: 'USDT',
          TOKEN_ADDRESS: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          coin: 18,
          url: usdt_icon,
        },
        {
          label: 'USDC',
          value: 'usdc',
          type: 'USDC',
          TOKEN_ADDRESS: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          coin: 6,
          url: centreusdc,
        },
      ],
      unit: [
        {
          type: 'mwei',
          value: '6',
        },
        {
          type: 'ether',
          value: '18',
        },
      ],
    },
    // 56: {
    //   Cc_ADDRESS: '',
    //   Token_ADDRESS: '',
    //   Swap_ADDRESS: '',
    //   apiKey: 'https://api.bscscan.com/api',
    //   apiUrl: '366TDMB1M11NCFABM78212QFUM81INYK1C',
    //   SelectOptions: [],
    //   unit: [],
    // },
  },
}

export const Swap_ABI: any = Swap
export const Token_ABI: any = Token
export const Cc_ABI: any = Cc

export const DEFAULT_CHAINID: number = DEFAULT_CHAINID_ENV[REACT_APP_ENV]

export const USECONSTANT: UseConstantType = useConstant[REACT_APP_ENV]

export const getActiveChainId = (arr: string[], network: number) => {
  if (network === null) return false
  return arr.some((item) => Number(item) === Number(network))
}
