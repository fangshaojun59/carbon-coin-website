import { memo } from 'react'
import { SideMenuWrapper } from './styled'
import { NavLink, useLocation } from 'react-router-dom'
import { MenuListInit, oddEvent } from '@/common'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'

const styleMenu = {
  width: '100%',
  background: 'transparent',
  borderBottom: 'none',
}

export default memo(function SideMenuPage() {
  const { i18n } = useTranslation()

  let location = useLocation()

  return (
    <SideMenuWrapper>
      <Menu mode="horizontal" style={styleMenu}>
        {MenuListInit.map((item, index) => (
          <Menu.Item key={item.key} className="menu-item-cus">
            <NavLink
              to={item.url === '' ? {} : item.url}
              caseSensitive
              className={({ isActive }) => (oddEvent(isActive, location, item) ? 'navlink-active' : 'navlink-default')}
              onClick={() => {
                if (item.key === 'whitePaper') {
                  window.open(require('../../assets/img/CC.pdf'), '_blank')
                } else if (item.key === 'block') {
                  window.open('https://goerli.etherscan.io/address/0x40Aed25c2Ef72Daa79ebdF99e213bA6288431631', '_blank')
                }
              }}
            >
              <div className="navlink-child-title">{i18n.language === 'en' ? item.enName : item.name}</div>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </SideMenuWrapper>
  )
})
