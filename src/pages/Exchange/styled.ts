import styled, { css } from 'styled-components'
import { h5LayoutAdaptation, flatLayoutAdaptation, webLayoutAdaptation } from '@/common/styled'
import exBg from '@/assets/img/exBg.png'

export const HomeWrapper = styled.div`
  background-image: url(${exBg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  ${h5LayoutAdaptation}
  width: 100%;
  min-height: calc(100vh - 6.25rem - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
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

    .content {
    padding: 3.5625rem 0 4.1875rem 0;
    @media only screen and (max-width: 768px) {
      padding: 0;
      width: 100%;
    }
    .tips {
      font-size: 1.5rem;
      font-weight: 400;
      color: white;
      text-align: center;
    }
    .tips_des {
      font-size: 1.125rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      margin: 2rem 0 2.75rem 0;
    }

    .ccModal {
      width: 50rem;
      background: #ffffff;
      box-shadow: 0px 0px 0.9375rem 0px rgba(230, 230, 230, 0.6);
      border-radius: 2.4375rem;
      margin: 0 auto;
      padding: 3.5625rem 4.3125rem 4.1875rem 4.3125rem;
      @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 10px;
      }
      .title {
        font-size: 1.875rem;
        font-weight: 600;
        color: #000000;
        text-align: center;
      }
      .modal_input {
        width: 100%;
        height: 9.125rem;
        background: #f0f7ff;
        border: 0.0625rem solid #d8e1eb;
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem;
        position: relative;
        .exDown {
          width: 3.875rem;
          position: absolute;
          bottom: -2.9063rem;
          z-index: 9;
          left: 50%;
          margin-left: -1.9375rem;
        }
        &.fir {
          margin: 2.75rem 0 1.9375rem 0;
        }
        .ant-input-number {
          flex: 1;
          outline: none;
          border: none;
          background-color: transparent;
          font-size: 1.125rem;
          box-shadow: none;
          &::placeholder {
            color: #c6d4e4;
          }
        }
        .myInput input {
          font-weight: bold;
          color: black;
          font-size: 1.625rem;
        }
        input {
          border: none;
          outline: none;
          background-color: transparent;
          font-size: 1.125rem;
          &::placeholder {
            color: #c6d4e4;
          }
        }
        .modal_input_right {
          .sel {
            display: flex;
            justify-content: right;
            align-items: center;
            .ant-select:not(.ant-select-customize-input) .ant-select-selector {
              background-color: transparent;
              border: none;
              outline: none;
              box-shadow: none;
            }
            .ant-select-selection-item {
              font-size: 1.25rem;
              color: #000000;
              font-weight: 600;
              display: flex;
              align-items: center;
            }
          }
          .value {
            text-align: right;
            font-size: 1rem;
            font-weight: 400;
            color: #9cb0c6;
            margin-top: 1rem;
            .max {
              /* width: 4.5rem; */
              padding: 3px 0.625rem;
              /* height: 2rem; */
              display: inline-block;
              border: 0.0625rem solid #0088fe;
              border-radius: 1rem;
              margin-left: 0.625rem;
              text-align: center;
              /* line-height: 2rem; */
              color: #0088fe;
              cursor: pointer;
              font-size: 1rem;
            }
          }
        }
      }
      .modal_tips {
        text-align: center;
        margin: 1.9375rem 0 2.5rem 0;
        font-size: 1.125rem;
        color: #000000;
        font-weight: 500;
      }
      .operation {
        display: flex;
        justify-content: center;
        .operation_btn {
          width: 15.3125rem;
          height: 5rem;
          border-radius: 2.5rem;
          text-align: center;
          line-height: 5rem;
          cursor: pointer;
          font-size: 1.5rem;
          color: white;
          &:first-child {
            margin-right: 4.6875rem;
          }
          &.active {
            background: #0088fe;
          }
          &.disable {
            background: #dee5eb;
            cursor: not-allowed;
          }
        }
      }
    }
  }
`
