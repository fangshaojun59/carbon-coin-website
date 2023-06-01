import styled from 'styled-components'

export const SideMenuWrapper = styled.div`
  display: flex;
  .fours {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    a {
      width: 50%;
      text-align: center;
    }
  }
  .ant-menu-item-selected .navlink-child-title,
  .ant-menu-item-active .navlink-child-title,
  .navlink-active .navlink-child-title {
    border-bottom: 4px solid #0088fe;
  }

  .menu-item-cus {
    .navlink-active {
      color: ${(props) => props.theme.themeColor} !important;
      font-size: 1.125rem;
      font-weight: 600;
    }
    .navlink-default {
      color: ${(props) => props.theme.white} !important;
      font-size: 1.125rem;
      font-weight: 500;
      &:hover {
        content: '';
        font-weight: 600;
        color: ${(props) => props.theme.themeColor} !important;
      }
    }
    .navlink-child-title {
      padding: 0 0.63rem;
    }
  }
`
