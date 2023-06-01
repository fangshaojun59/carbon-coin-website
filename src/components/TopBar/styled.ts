import styled, { css } from 'styled-components'

export const TopBarWrapper = styled.div`
  width: 100%;
  height: 5rem;
  .topbar-ant-row {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    .topbar-right {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }
  }
  padding: 0 2.1875rem 0 10.125rem;
  ${(props) =>
    props.theme.mediaWidth.maxl(
      () => css`
        max-width: 100%;
      `,
    )}
  @media only screen and (max-width: 768px) {
    padding: 0 0.625rem;
    .ant-image {
      width: 50px;
    }
  }
`
