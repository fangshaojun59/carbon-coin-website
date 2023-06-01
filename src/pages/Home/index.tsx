/*eslint-disable*/
import { memo, useEffect, useState } from 'react'
import { HomeWrapper } from './styled'
import { useTranslation } from 'react-i18next'
import CC from '@/assets/img/cc.png'
import Foundation from '@/assets/img/foundation.png'
import { useLocation } from 'react-router-dom'

export default memo(function HomePage() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const location = useLocation()

  useEffect(() => {
    const herf = window.location.href
    if (herf.indexOf('?') !== -1) {
      const name = herf.split('?')[1].split('=')[1]
      setName(name)
      if (name === 'token') {
        const a = document.getElementById('Token')
        if (a) {
          a.scrollIntoView({ block: 'start' })
        }
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <HomeWrapper>
      <div className="firstPart">
        <div className="firstPart_left">
          <div className="firstPart_left_tips">{t('home.first.tips')}</div>
          <div className="firstPart_left_topic">{t('home.first.topic')}</div>
          <div className="firstPart_left_des">{t('home.first.des')}</div>
        </div>
      </div>

      <div className="secondPart second" id="Token">
        <div>
          <div>
            <img src={CC} alt="" />
          </div>
          <div className="secondPart_topic">{t('home.second.topic')}</div>
          <div className="secondPart_des">{t('home.second.des')}</div>
        </div>
      </div>

      <div className="secondPart five">
        <div>
          <img src={Foundation} alt="" />
        </div>
        <div className="secondPart_topic">{t('home.five.topic')}</div>
        <div className="secondPart_des">{t('home.five.des')}</div>
      </div>
    </HomeWrapper>
  )
})
