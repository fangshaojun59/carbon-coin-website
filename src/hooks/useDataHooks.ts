import { useContext } from 'react'
import type { ConstantInitTypes } from '@/contracts/constant.init'
import { Context } from '@/components/Web3Provider'

const useDataHooks = () => {
  const { data }: { data: ConstantInitTypes; blockNumber?: number } = useContext<any>(Context)
  return data
}

export default useDataHooks
