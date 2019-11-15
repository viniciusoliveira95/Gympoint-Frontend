import styled from 'styled-components';
import { lighten } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin-top: 34px;
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 24px;
      font-weight: bold;
      color: ${colors.fontBold};
    }

    div {
      display: flex;
      align-items: center;

      button {
        margin-right: 16px;
        height: 36px;
        width: 142px;
        border: 0;
        border-radius: 4px;
        background: ${colors.primary};
        color: ${colors.white};
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.5s;

        &:hover {
          background: ${lighten(0.05, colors.primary)};
        }

        svg {
          margin-right: 8px;
        }
      }

      div {
        position: relative;

        svg {
          position: absolute;
          left: 16px;
          cursor: pointer;
        }

        input {
          padding: 0 20px 0 40px;
          height: 36px;
          width: 240px;
          border: 1px solid #dddddd;
          border-radius: 4px;
          background: ${colors};
          font-size: 14px;
          color: ${colors.fontPrimary};

          &::placeholder {
            font-size: 14px;
            color: ${colors.placeholder};
          }
        }
      }
    }
  }
`;

export const TableContainer = styled.div`
  margin-top: 24px;
  padding: 30px;
  background: ${colors.formBackground};
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;

  thead {
    tr {
      th {
        text-align: center;
        font-size: 16px;
        line-height: 19px;
        color: ${colors.fontBold};
        padding-bottom: 4px;

        &:nth-child(1) {
          text-align: left;
          width: 30%;
        }
        &:nth-child(2) {
          text-align: left;
          width: 25%;
        }
        &:nth-child(3) {
          width: 15%;
        }
        &:nth-child(4) {
          width: 15%;
        }
        &:nth-child(5) {
          width: 15%;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        font-size: 16px;
        color: ${colors.fontPrimary};
        padding-bottom: 16px;
        padding-top: 16px;
        border-bottom: 1px solid #eeeeee;

        &:nth-child(1) {
          text-align: left;
          width: 30%;
        }
        &:nth-child(3) {
          text-align: center;
        }
        &:nth-child(4) {
          text-align: center;
        }
        &:nth-child(5) {
          text-align: right;
          a {
            color: ${colors.blue};
            font-size: 15px;

            transition: color 0.3s;

            &:hover {
              color: ${lighten(0.1, colors.blue)};
            }
          }

          button {
            color: ${colors.red};
            margin-left: 23px;
            font-size: 15px;
            background: ${colors.white};
            border: 0;
            transition: color 0.3s;

            &:hover {
              color: ${lighten(0.1, colors.red)};
            }
          }
        }
      }

      &:last-child {
        td {
          border-bottom: 0;
        }
      }
    }
  }
`;
