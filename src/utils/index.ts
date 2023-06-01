import Web3 from 'web3'
export const baseURL = '/api'

export const decimal = (num: any) => {
  if (num) {
    const newNum: any = Web3.utils.fromWei(num)

    const index = newNum.indexOf('.')
    if (newNum.indexOf('.') !== -1) {
      num = newNum.substring(0, 6 + index + 1)
    } else {
      num = newNum.substring(0)
    }
  } else {
    num = 0
  }
  return parseFloat(num) || 0
}

export const formatStrAddress = (left: number, right: number, str: string) =>
  str.substring(0, left) + new Array(4).join('.') + str.substring(str.length - right, str.length)

export const Adapth5 = 768
