import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  background: ${(props) => props.theme.white};
`

export const LayoutContent = styled.div`
  min-height: calc(100vh - 6.0625rem);
  padding-top: 5rem;
  background: ${(props) => props.theme.bgColor2};
`

export const LayoutTopBar = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  background: ${(props) => props.theme.bgColor1};
`

export const LayoutFooter = styled.div`
  width: 100%;
  background: ${(props) => props.theme.bgColor1};
`
