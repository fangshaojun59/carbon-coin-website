import { Button } from 'antd'
import styled from 'styled-components'

export const ConnectWalletWrapper = styled.div`
  margin-right: 0.63rem;
  .wallet-connect {
    width: 110px;
    height: 40px;
    background: #0189fe;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    color: white;
  }
`

export const ModalTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin: 0.63rem 0;
`

export const AddressTitle = styled(Button)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  font-weight: 500;
  flex-direction: row-reverse;
  border: 1px solid ${(props) => props.theme.themeColor};
  &:hover {
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.themeColor};
  }
  .anticon-login {
    margin-left: 0.5rem;
  }
`
