import Web3 from 'web3'
import { Cc_ABI, coinType, Swap_ABI, Token_ABI, unitType, USECONSTANT } from '@/contracts/constant'
import { REACT_APP_ENV } from '@/contracts/chains'

export interface ConstantTypes {
  ContractSwap: any
  ContractToken: any
  ContractCc: any
}

export interface ConstantInitTypes {
  web3: Web3
  Swap_ADDRESS: string
  Token_ADDRESS: string
  Cc_ADDRESS: string
  constant: ConstantTypes
  toWeiFromWei: (s: any) => void
  apiUrl: string
  apiKey: string
  SelectOptions: coinType[]
  unit: unitType[]
}

export class ConstantInit {
  web3: Web3
  Swap_ADDRESS: string
  Token_ADDRESS: string
  Cc_ADDRESS: string
  constant: ConstantTypes
  apiUrl: string
  apiKey: string
  SelectOptions: coinType[]
  unit: unitType[]

  constructor(provider: any, chainId: number) {
    const { Swap_ADDRESS, Token_ADDRESS, Cc_ADDRESS, apiKey, apiUrl, SelectOptions, unit } = USECONSTANT[chainId]

    this.web3 = new Web3(provider)
    this.Swap_ADDRESS = Swap_ADDRESS
    this.Token_ADDRESS = Token_ADDRESS
    this.Cc_ADDRESS = Cc_ADDRESS
    this.apiKey = apiKey
    this.apiUrl = apiUrl
    this.constant = {
      ContractSwap: new this.web3.eth.Contract(Swap_ABI, Swap_ADDRESS),
      ContractToken: new this.web3.eth.Contract(Token_ABI, Token_ADDRESS),
      ContractCc: new this.web3.eth.Contract(Cc_ABI, Cc_ADDRESS),
    }
    this.SelectOptions = SelectOptions
    this.unit = unit
    console.log('REACT_APP_ENV', REACT_APP_ENV)
  }

  toWeiFromWei = (number: any) => {
    let data = this.web3.utils.fromWei(number, 'ether')
    return Number(data).toFixed(6)
  }
}
