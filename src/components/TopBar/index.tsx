import { memo } from 'react'
import { TopBarWrapper } from './styled'
import { Image, Row, Col } from 'antd'
import { fallbackImage } from '@/common'
import { Link } from 'react-router-dom'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { Adapth5 } from '@/utils'
import SideMenuH5 from '@/components/SideMenuH5'
import SideMenu from '@/components/SideMenu'
import SwitchLanguage from '@/components/SwitchLanguage'
import ConnectWallet from '@/components/ConnectWallet'
import SelectNetWork from '@/components/SelectNetWork'
import LOGO from '@/assets/img/logo.png'
import LOGO1 from '@/assets/img/logo1.png'

export default memo(function TopBarPage() {
  const { windowSize } = useWindowSizeHooks()

  return (
    <TopBarWrapper>
      <Row className="topbar-ant-row">
        <Col span={12} md={{ span: 3 }}>
          <Link to="/home">
            <Image preview={false} src={windowSize.innerWidth <= Adapth5 ? LOGO1 : LOGO} fallback={fallbackImage} title="logo" />
          </Link>
        </Col>
        <Col span={0} md={{ span: 14 }}>
          <SideMenu />
        </Col>
        <Col span={12} md={{ span: 7 }} className="topbar-right">
          {windowSize.innerWidth <= Adapth5 && <SideMenuH5 />}
          {windowSize.innerWidth > Adapth5 && <SwitchLanguage />}
          <ConnectWallet />
          <SelectNetWork />
        </Col>
      </Row>
    </TopBarWrapper>
  )
})
