/*eslint-disable*/
import { memo, useEffect, useState } from 'react'
import { HomeWrapper } from './styled'
import { InputNumber, message, Select } from 'antd'
import useDataHooks from '@/hooks/useDataHooks'
import type { ConstantInitTypes } from '@/contracts/constant.init'
import { useDispatch, useSelector } from 'react-redux'
import { addSpining, delSpining, selectAddress } from '@/store/user'
import { useTranslation } from 'react-i18next'
import { Token_ABI } from '@/contracts/constant'
import exDown from '@/assets/img/exDown.png'
import cc from '@/assets/img/cc.png'
const { Option } = Select

interface listType {
  label: string
  value: string
  icon: string
  backgroundImage: string
  img: string
  fullName: string
}

export default memo(function ExchangePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const myAddress = useSelector(selectAddress)
  const dataInit: ConstantInitTypes = useDataHooks()
  const { constant, web3, Swap_ADDRESS, Cc_ADDRESS, SelectOptions, unit } = dataInit

  const [approveBalance, setApproveBalance] = useState(0)
  const [usdt, setUsdt] = useState<any>()
  const [balance, setbalance] = useState(0)
  const [contractbalance, setContractbalance] = useState(0)
  const [myBalance, setMyBalance] = useState(0)

  const [val, setVal] = useState<any>()
  const [defaultVal, setDefaultVal] = useState<string>('usdt')
  const [len, setLen] = useState<any>('18')
  const [rate, setRate] = useState(20)
  useEffect(() => {
    if (SelectOptions.length > 0) setDefaultVal(SelectOptions[0].value)
  }, [SelectOptions])

  useEffect(() => {
    if (myAddress) {
      init()
    }
  }, [myAddress, defaultVal])

  // 初始化数据
  const init = async () => {
    dispatch(addSpining())
    try {
      const ContractToken = await new web3.eth.Contract(
        Token_ABI,
        SelectOptions.find((item) => {
          return item.value === defaultVal
        })?.TOKEN_ADDRESS,
      )
      const leng: any = await ContractToken.methods.decimals().call()
      setLen(leng)
      const unitMethod: any =
        unit.find((item) => {
          return item.value === leng
        })?.type || 'ether'
      const balance: any = await ContractToken.methods.balanceOf(myAddress).call()

      setbalance(Number(web3.utils.fromWei(balance, unitMethod)) || 0)
      const contractbalance: any = await constant.ContractCc.methods.balanceOf(Swap_ADDRESS).call()
      setContractbalance(Number(web3.utils.fromWei(contractbalance, unitMethod)) || 0)
      const myBalance: any = await constant.ContractCc.methods.balanceOf(myAddress).call()

      setMyBalance(Number(web3.utils.fromWei(myBalance, 'ether')) || 0)
      const approveBalance: any = await ContractToken.methods.allowance(myAddress, Swap_ADDRESS).call()
      setApproveBalance(Number(web3.utils.fromWei(approveBalance, unitMethod)) || 0)
      const ratio: any = await constant.ContractSwap.methods.ratio().call()

      setRate(Number(ratio) / 10000)

      dispatch(delSpining())
    } catch (error) {
      console.log(error)
      dispatch(delSpining())
    }
  }

  // 授权
  const approve = async () => {
    if (!myAddress) {
      message.warning(t('app.link'))
      return
    }

    if (approveBalance >= usdt && approveBalance !== 0) {
      message.warning(t('pledge.isApp'))
      return
    }

    if (!usdt) {
      message.warning(t('pledge.approve.warning'))
      return
    }
    dispatch(addSpining())
    const unitMethod: any =
      unit.find((item) => {
        return item.value === len
      })?.type || 'ether'

    const ContractToken = await new web3.eth.Contract(
      Token_ABI,
      SelectOptions.find((item) => {
        return item.value === defaultVal
      })?.TOKEN_ADDRESS,
    )
    const amount = web3.utils.toWei(val + '', unitMethod)

    try {
      ContractToken.methods
        .approve(Swap_ADDRESS, amount)
        .send({
          from: myAddress,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          message.success(t('pledge.approve.success'))
          setVal(null)
          setUsdt(null)
          init()
          dispatch(delSpining())
        })
        .on('error', function (error: any, receipt: any) {
          console.log(error)
          message.success(t('pledge.approve.fail'))
          dispatch(delSpining())
        })
    } catch (error) {
      dispatch(delSpining())
    }
  }

  // 兑换
  const exchange = async () => {
    if (!myAddress) {
      message.warning(t('app.link'))
      return
    }

    if (!approveBalance) {
      return
    }

    if (!usdt) {
      message.warning(t('exchange.input1.placeholder'))
      return
    }

    if (usdt > contractbalance) {
      message.warning(t('pledge.warning'))
      return
    }

    const TOKEN_ADDRESS = SelectOptions.find((item) => {
      return item.value === defaultVal
    })?.TOKEN_ADDRESS
    const ContractToken = await new web3.eth.Contract(Token_ABI, TOKEN_ADDRESS)
    const approve: any = await ContractToken.methods.allowance(myAddress, Swap_ADDRESS).call()

    if (val > approve) {
      message.warning(t('pledge.approve.banlance'))
      return
    }
    dispatch(addSpining())

    try {
      constant.ContractSwap.methods
        .swapCC(TOKEN_ADDRESS, Number(val) * 10000)
        .send({
          from: myAddress,
        })
        .on('transactionHash', function (hash: any) {
          console.log(hash)
        })
        .on('receipt', async (receipt: any) => {
          message.success(t('pledge.stake.success'))
          setVal(null)
          setUsdt(null)
          init()
          dispatch(delSpining())
        })
        .on('error', function (error: any, receipt: any) {
          dispatch(delSpining())
          message.error(error.message || t('pledge.stake.fail'))
        })
    } catch (error) {
      console.log(error)
      dispatch(delSpining())
    }
  }

  return (
    <HomeWrapper>
      <div className="content">
        <div className="ccModal">
          <div className="title">{t('exchange.modal.title')}</div>
          <div className="modal_input fir">
            <InputNumber
              controls={false}
              min="0.0001"
              max={balance}
              value={val}
              placeholder={t('exchange.input1.placeholder')}
              precision={4}
              onChange={(e) => {
                setVal(e)
                setUsdt(e * rate)
              }}
            />
            <div className="modal_input_right">
              <div className="sel">
                <Select
                  placeholder={t('create.from5.placeholder')}
                  defaultValue={defaultVal}
                  value={defaultVal}
                  onChange={(e: any) => {
                    setDefaultVal(e)
                  }}
                >
                  {SelectOptions.map((item) => {
                    return (
                      <Option value={item.value} key={item.value}>
                        <img src={item.url} width="28" alt="" style={{ marginRight: '0.4375rem' }} />
                        {item.label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
              <div className="value">
                {t('exchange.input1.value')}：{parseFloat(balance.toFixed(4))}{' '}
                {balance > 0 && (
                  <span
                    className="max"
                    onClick={() => {
                      setVal(balance)
                      setUsdt(balance)
                    }}
                  >
                    {t('exchange.input1.max')}
                  </span>
                )}
              </div>
            </div>
            <img src={exDown} alt="" className="exDown" />
          </div>
          <div className="modal_input">
            <InputNumber className="myInput" controls={false} placeholder="" precision={4} disabled value={usdt || 0} />
            <div className="modal_input_right">
              <div className="sel">
                <img src={cc} alt="" width="28" />
                <Select placeholder={t('create.from5.placeholder')} defaultValue={'CC'} value={'CC'} disabled>
                  <Option value={Cc_ADDRESS}>CC</Option>
                </Select>
              </div>
              <div className="value">
                {t('exchange.input1.value')}：{parseFloat(myBalance.toFixed(4))}
              </div>
            </div>
          </div>
          <div className="modal_tips">
            1 {defaultVal.toLocaleUpperCase()} = {rate} CC
          </div>
          <div className="operation">
            <div
              className={approveBalance === 0 || usdt > approveBalance ? 'operation_btn active' : 'operation_btn disable'}
              onClick={approve}
            >
              {t('exchange.opera.btn1')}
            </div>
            <div
              className={approveBalance === 0 || usdt > approveBalance ? 'operation_btn disable' : 'operation_btn active'}
              onClick={exchange}
            >
              {t('exchange.opera.btn2')}
            </div>
          </div>
        </div>
      </div>
    </HomeWrapper>
  )
})
