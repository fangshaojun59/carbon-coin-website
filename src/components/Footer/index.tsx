import { memo } from 'react'
import { FooterWrapper } from './styled'
import { useTranslation } from 'react-i18next'
import Te from '@/assets/svg/telegram.svg'
import Tw from '@/assets/svg/twitter.svg'
import Medium from '@/assets/svg/medium.svg'

export default memo(function FooterPage() {
  const { t } = useTranslation()

  return (
    <FooterWrapper>
      <div className="footer">
        <div>{t('app.footer')}</div>
        <div>
          <a
            href="javascript:void(0);"
            rel="external nofollow"
            onClick={() => {
              window.open('https://t.me/carboncoinsofficialgroup', '_blank')
            }}
          >
            <img src={Te} alt="" />
          </a>
          <a
            href="javascript:void(0);"
            rel="external nofollow"
            onClick={() => {
              window.open('https://twitter.com/CarbonCoinmedia', '_blank')
            }}
          >
            <img src={Tw} alt="" />
          </a>
          <a
            href="javascript:void(0);"
            rel="external nofollow"
            onClick={() => {
              window.open('https://medium.com/@CarbonCoinsmedia', '_blank')
            }}
          >
            <img src={Medium} alt="" />
          </a>
        </div>
      </div>
    </FooterWrapper>
  )
})
