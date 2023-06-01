import { memo, useEffect } from 'react'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { useChainIdHooks } from '@/hooks/useChainIdHooks'

export default memo(function PagesProvider({ children }: any) {
  useChainIdHooks()
  const { windowSize } = useWindowSizeHooks()

  useEffect(() => {
    if (windowSize.innerWidth < 1920 && windowSize.innerWidth > 750) {
      let fontSize = `${(windowSize.innerWidth / 1920) * 100 > 63 ? ((windowSize.innerWidth / 1920) * 100).toFixed(2) : 62.5}%`
      document.documentElement.style.fontSize = fontSize
    } else if (windowSize.innerWidth <= 750) {
      let fontSize = `${(windowSize.innerWidth / 750) * 100 > 63 ? ((windowSize.innerWidth / 750) * 100).toFixed(2) : 62.5}%`
      document.documentElement.style.fontSize = fontSize
    } else document.documentElement.style.fontSize = '100%'
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.innerWidth])

  return children
})
