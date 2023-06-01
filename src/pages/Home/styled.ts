import styled, { css } from 'styled-components'
import { h5LayoutAdaptation, flatLayoutAdaptation, webLayoutAdaptation } from '@/common/styled'
import bgPhone1 from '@/assets/img/bgPhone1.png'
import bgPhone2 from '@/assets/img/bgPhone2.png'
import homeBg1 from '@/assets/img/homgBg1.png'
import homeBg2 from '@/assets/img/homeBg2.png'
import homeBg3 from '@/assets/img/homeBg3.png'
import homeBg4 from '@/assets/img/homeBg4.png'
import homeBg5 from '@/assets/img/homeBg5.jpg'

export const HomeWrapper = styled.div`
  ${h5LayoutAdaptation}
  width: 100%;
  min-height: calc(100vh - 6.25rem - 5rem);
  padding: 0 !important;
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
        max-width: 100%;
      `,
    )}

.firstPart {
    width: 100%;
    padding: 10.1875rem 7.9375rem;
    display: flex;
    align-items: center;
    background-image: url(${homeBg1});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @media only screen and (max-width: 768px) {
      padding: 0;
      height: 600px;
      background-image: url(${bgPhone1});
      .firstPart_left {
        width: 100% !important;
        padding: 1rem 2rem;
        margin-right: 0 !important;
      }
      .firstPart_right {
        width: 100%;
      }
    }
    .firstPart_left {
      width: calc(100% - 54rem);
      margin-right: 10rem;
      .firstPart_left_tips {
        font-size: 3rem;
        font-weight: 500;
        color: #333333;
      }
      .firstPart_left_topic {
        font-size: 3.375rem;
        font-weight: 600;
        color: #0088fe;
      }
      .firstPart_left_des {
        font-size: 1.625rem;
        font-weight: 500;
        color: #0088fe;
        @media only screen and (max-width: 768px) {
          font-size: 2rem;
        }
      }
    }
  }
  .secondPart {
    width: 100%;
    padding: 16.8125rem 0 22.75rem 0;
    background-image: url(${homeBg2});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    @media only screen and (max-width: 768px) {
      background-image: url(${bgPhone2});
      padding: 16.8125rem 10px 22.75rem 10px;
      &.second {
        height: 600px;
        padding: 8rem 10px 22.75rem 10px;
        .secondPart_topic {
          margin: 1rem 0;
        }
        .secondPart_des {
          line-height: 3rem;
        }
      }
    }
    &.third {
      background-image: url(${homeBg3});
    }
    &.four {
      background-image: url(${homeBg4});
    }
    &.five {
      background-image: url(${homeBg5});
      .secondPart_topic,
      .secondPart_des {
        color: white;
        line-height: 48px;
      }
    }

    .secondPart_topic {
      font-size: 3.375rem;
      font-weight: 600;
      color: #000000;
      margin: 2.1875rem 0 2.9375rem 0;
    }
    .secondPart_des {
      font-size: 1.625rem;
      font-weight: 500;
      color: #888888;
      max-width: 55.9375rem;
      margin: 0 auto;
      line-height: 48px;
    }
  }
`
