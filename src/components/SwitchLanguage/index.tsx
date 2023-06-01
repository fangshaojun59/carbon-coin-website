import { memo, useState } from 'react'
import { Radio, message, Popover } from 'antd'
import { useWindowSizeHooks } from '@/hooks/useWindowSizeHooks'
import { SwitchLanguageWrapper, SwitchH5, LanguageList, LanguageTitle } from './styled'
import { Adapth5 } from '@/utils'
import { useTranslation } from 'react-i18next'
import { DownOutlined } from '@ant-design/icons'

export default memo(function SwitchLanguagePage() {
  const { windowSize } = useWindowSizeHooks()
  const { i18n, t } = useTranslation()
  const [move, setMoveSwitch] = useState(false)

  const languageChange = (str: 'en' | 'zh') => i18n.changeLanguage(str)

  const languageChangeSwitch = (str: 'en' | 'zh') => {
    languageChange(str)
    message.info({
      content: t('app.switch.language.tips', { msg: str === 'zh' ? '中文' : 'English' }),
      className: 'message-global',
    })
    setMoveSwitch(false)
  }

  return (
    <>
      {windowSize.innerWidth > Adapth5 ? (
        <SwitchLanguageWrapper className="SwitchLanguageWrapper">
          <Popover
            overlayClassName="languageOverlayClassName"
            visible={move}
            onVisibleChange={(visible) => setMoveSwitch(visible)}
            content={
              <div>
                <LanguageList className={i18n.language === 'zh' ? 'language-list-active' : ''} onClick={() => languageChangeSwitch('zh')}>
                  简体中文
                </LanguageList>
                <LanguageList className={i18n.language === 'en' ? 'language-list-active' : ''} onClick={() => languageChangeSwitch('en')}>
                  English
                </LanguageList>
              </div>
            }
            arrowPointAtCenter={true}
            getPopupContainer={() => (document as any).getElementsByClassName('SwitchLanguageWrapper')[0]}
          >
            <LanguageTitle>
              <span>{i18n.language === 'zh' ? '简体中文' : 'English'}</span>
              <DownOutlined style={{ color: 'white', lineHeight: '.88rem' }} />
            </LanguageTitle>
          </Popover>
        </SwitchLanguageWrapper>
      ) : (
        <SwitchH5>
          <Radio.Group
            options={[
              { label: '中文', value: 'zh' },
              { label: 'English', value: 'en' },
            ]}
            onChange={(str: any) => languageChangeSwitch(str.target.value)}
            value={i18n.language === 'zh' ? 'zh' : 'en'}
            optionType="button"
            buttonStyle="solid"
          />
        </SwitchH5>
      )}
    </>
  )
})
