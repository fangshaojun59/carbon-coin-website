import styled, { css } from 'styled-components'

export const SwitchLanguageWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  z-index: 10;
  margin-right: 0.63rem;
  .language-list-active {
    background-color: ${(props) => props.theme.themeColor}32;
  }
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        margin-right: 0;
      `,
    )}
`

export const SwitchH5 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.25rem 0;
`

export const LanguageList = styled.div`
  line-height: 2.5rem;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: bold;
  color: #293543;
  transition: all 0.3s;
  :hover {
    background-color: ${(props) => props.theme.themeColor}32;
  }
`

export const LanguageTitle = styled.div`
  font-weight: 500;
  color: #0065eb;
  display: flex;
  align-items: center;
  min-width: 4.63rem;
  span {
    margin: 0 0.25rem;
  }
  ${(props) =>
    props.theme.mediaWidth.lg(
      () => css`
        min-width: 6.5rem;
      `,
    )}
`
