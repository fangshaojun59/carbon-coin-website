import styled, { css } from 'styled-components'
import { Row } from 'antd'

export const ModalContentRow = styled(Row)`
  display: flex;
  align-items: center;
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .number {
    width: 1.5rem;
    height: 1.5rem;
    text-indent: 0px;
    text-align: center;
    border-radius: 100%;
    color: rgb(101, 102, 111);
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.line};
  }
  .choose-info {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0.63rem 0;
    border-radius: 0.75rem;
    &:hover {
      background: ${(props) => props.theme.themeColor}32;
    }
    .choose-span {
      font-size: 0.88rem;
      line-height: 2.5rem;
      font-weight: 400;
      color: #8c8c8c;
    }
    .choose-icon {
      width: 1.88rem;
      height: 1.88rem;
      font-size: 1.5rem;
      right: calc(50% - 2.88rem);
      color: #1da57a;
      position: absolute;
      bottom: calc(1.88rem + 1.25rem);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      background: ${(props) => props.theme.white};
      ${(props) =>
        props.theme.mediaWidth.md(
          () => css`
            font-size: 1rem;
            right: calc(50% - 1.88rem);
            width: 1.25rem;
            height: 1.25rem;
          `,
        )}
    }
  }
`

export const webLayoutAdaptationMax = css`
  max-width: min(75rem, 120rem - 45rem);
  margin: 0 auto;
`

export const webLayoutAdaptation = css`
  /* max-width: min(62.5%, 100% - 37.5%);
  margin: 0 auto; */
  margin: 0 auto;
  padding: 0.625rem;
`

export const flatLayoutAdaptation = css`
  /* max-width: min(82.01%, 100% - 17.99%);
  margin: 0 auto; */
  margin: 0 auto;
  padding: 0.625rem;
`

export const h5LayoutAdaptation = css`
  margin: 0 auto;
  padding: 0.625rem;
`
