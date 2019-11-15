import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 700px;
  margin-top: 34px;
  width: 100%;

  span {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.fontBold};
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
        text-align: left;
        font-size: 16px;
        line-height: 19px;
        color: ${colors.fontBold};
        padding-bottom: 4px;

        &:nth-child(1) {
          text-align: left;
          width: 80%;
        }
        &:nth-child(2) {
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
        text-align: left;

        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: right;
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
