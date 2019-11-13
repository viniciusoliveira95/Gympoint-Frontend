import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 900px;
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
  }
`;

export const CreateButton = styled.button`
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

  svg {
    margin-right: 8px;
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
          width: 40%;
        }
        &:nth-child(2) {
          width: 20%;
        }
        &:nth-child(3) {
          width: 20%;
        }
        &:nth-child(4) {
          width: 20%;
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
        line-height: 20px;
        text-align: center;

        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(4) {
          text-align: right;

          a {
            color: ${colors.blue};
            font-size: 15px;
          }

          button {
            color: ${colors.red};
            margin-left: 23px;
            font-size: 15px;
            background: ${colors.white};
            border: 0;
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
