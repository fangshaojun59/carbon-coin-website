import { ModalProps } from 'antd/lib/modal/Modal'
import { CloseSquareOutlined } from '@ant-design/icons'
import { DrawerProps } from 'antd'

export const modalLayout: ModalProps = {
  footer: null,
  closeIcon: <CloseSquareOutlined />,
  wrapClassName: 'common-modal',
  width: '36.88rem',
  centered: true,
}

export const drawerLayout: DrawerProps = {
  placement: 'bottom',
  height: '60%',
  closeIcon: <CloseSquareOutlined />,
  className: 'common-drawer',
}
