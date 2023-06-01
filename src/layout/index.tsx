import { memo } from 'react'
import { LayoutWrapper, LayoutContent, LayoutTopBar, LayoutFooter } from './styled'
import { Outlet } from 'react-router-dom'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'

export default memo(() => (
  <LayoutWrapper>
    <LayoutTopBar>
      <TopBar />
    </LayoutTopBar>
    <LayoutContent>
      <Outlet />
    </LayoutContent>
    <LayoutFooter>
      <Footer />
    </LayoutFooter>
  </LayoutWrapper>
))
