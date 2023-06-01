import { memo, useRef } from 'react'
import { Drawer, Row, Col, Image } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { SideMenuH5Wrapper } from './styled'
import { MenuListInit } from '@/common'
import { useTranslation } from 'react-i18next'
import { drawerLayout } from '@/common/antd.cus'
import { useBoolean } from 'ahooks'
import { fallbackImage, oddEvent } from '@/common'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SwitchLanguage from '@/components/SwitchLanguage'
import LOGO from '@/assets/img/logo.png'

export default memo(function SideMenuH5Page() {
  const { i18n } = useTranslation()
  let location = useLocation()

  const [isMenuShow, setIsMenuShow] = useBoolean(false)
  const modalRef = useRef<any>(null)

  return (
    <SideMenuH5Wrapper>
      {!isMenuShow && <MenuOutlined className="side-menu-h5-icon" onClick={setIsMenuShow.setTrue} />}
      {isMenuShow && <CloseOutlined className="side-menu-h5-icon" style={{ color: '#5f6469' }} onClick={setIsMenuShow.setFalse} />}
      <Drawer
        {...drawerLayout}
        placement="top"
        height="60%"
        getContainer={modalRef.current}
        visible={isMenuShow}
        closable={false}
        className="wallet-connect-h5-drawer"
        onClose={setIsMenuShow.setFalse}
      >
        <Row className="h5-drawer-topbar">
          <Col span={12} md={{ span: 6 }}>
            <Link to="/home">
              <Image width="auto" src={LOGO} fallback={fallbackImage} title="logo" />
            </Link>
          </Col>
          <Col span={12} md={{ span: 6 }} className="topbar-right">
            <CloseOutlined className="side-menu-h5-icon" style={{ color: '#5f6469' }} onClick={setIsMenuShow.setFalse} />
          </Col>
        </Row>
        <div className="h5-drawer-menu">
          {MenuListInit.map((item, index) => (
            <NavLink
              key={index}
              to={item.url === '' ? {} : item.url}
              className={({ isActive }) => (oddEvent(isActive, location, item) ? 'navlink-active' : 'navlink-default')}
              onClick={() => {
                if (item.key === 'whitePaper') {
                  window.open('#', '_blank')
                  // if (i18n.language === 'en') {
                  //   window.open('', '_blank')
                  // } else {
                  //   window.open('', '_blank')
                  // }
                } else if (item.key === 'block') {
                  window.open('https://goerli.etherscan.io/address/0x40Aed25c2Ef72Daa79ebdF99e213bA6288431631', '_blank')
                }
              }}
            >
              <div className="navlink-child-title">{i18n.language === 'en' ? item.enName : item.name}</div>
            </NavLink>
          ))}
        </div>
        <SwitchLanguage />
      </Drawer>
    </SideMenuH5Wrapper>
  )
})
