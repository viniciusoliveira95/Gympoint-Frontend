import styled from 'styled-components';
import { lighten } from 'polished';

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

    div {
      display: flex;
      align-items: center;

      button {
        margin-right: 16px;
        height: 36px;
        width: 112px;
        border: 0;
        border-radius: 4px;
        background: ${colors.btnVoltar};
        color: ${colors.white};
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.5s;

        &:hover {
          background: ${lighten(0.05, colors.btnVoltar)};
        }

        svg {
          margin-right: 8px;
        }

        &:last-child {
          background: ${colors.primary};
          margin-right: 0;
          transition: background 0.5s;

          &:hover {
            background: ${lighten(0.05, colors.primary)};
          }
        }
      }
    }
  }
`;

export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.fontBold};
`;

export const FormInputs = styled.div`
  background: ${colors.formBackground};
  margin-top: 20px;
  padding: 10px 30px 30px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    align-self: flex-start;
    margin-top: 20px;
    font-weight: bold;
    color: ${colors.fontBold};
    font-size: 14px;
  }

  input {
    width: 100%;
    margin-top: 8px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    height: 45px;
    padding: 15px 0 13px 13px;
    font-size: 16px;
    color: ${colors.fontPrimary};

    &::placeholder {
      font-size: 16px;
      color: ${colors.placeholder};
    }
  }

  span {
    margin-top: 8px;
    display: flex;
    align-self: flex-start;
    color: ${colors.red};
    font-size: 12px;
    font-weight: bold;

    &::before {
      content: '*';
    }
  }
`;

export const DivRow = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  label {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }

    input {
      width: 100%;

      &:read-only {
        background: #f5f5f5;
      }
    }
  }
`;
