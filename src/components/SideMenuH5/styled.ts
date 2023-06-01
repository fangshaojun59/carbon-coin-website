import styled, { css } from 'styled-components'
import { h5LayoutAdaptation, webLayoutAdaptation, webLayoutAdaptationMax, flatLayoutAdaptation } from '@/common/styled'

const h5DrawerMenuCss = css`
  ${h5LayoutAdaptation}
  height: 5rem;
  line-height: 5rem;
  ${(props) =>
    props.theme.mediaWidth.md(
      () => css`
        ${flatLayoutAdaptation}
      `,
    )}
  ${(props) =>
    props.theme.mediaWidth.mxl(
      () => css`
        ${webLayoutAdaptation}
      `,
    )}
  ${(props) =>
    props.theme.mediaWidth.maxl(
      () => css`
        ${webLayoutAdaptationMax}
      `,
    )}
`

export const SideMenuH5Wrapper = styled.div`
  .tabbar-right {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .side-menu-h5-icon {
    color: ${(props) => props.theme.white};
    font-size: 2rem;
    margin-left: 0.94rem;
  }
  .h5-drawer-topbar {
    ${h5LayoutAdaptation}
    height: 5rem;
    display: flex;
    align-items: center;
    ${(props) =>
      props.theme.mediaWidth.md(
        () => css`
          ${webLayoutAdaptation}
        `,
      )}
    ${(props) =>
      props.theme.mediaWidth.maxl(
        () => css`
          ${webLayoutAdaptationMax}
        `,
      )}
  }
  .h5-drawer-menu {
    display: flex;
    flex-direction: column;
    .navlink-active {
      ${h5DrawerMenuCss}
      color: ${(props) => props.theme.themeColor} !important;
      font-size: 1.125rem;
      font-weight: 600;
    }
    .navlink-default {
      ${h5DrawerMenuCss}
      color: ${(props) => props.theme.black} !important;
      font-size: 1.125rem;
      font-weight: 500;
      &:hover {
        content: '';
        font-weight: 600;
        color: ${(props) => props.theme.themeColor} !important;
      }
    }
  }
`
