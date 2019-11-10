import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  background: ${colors.formBackground};
  padding: 50px 30px;
  align-items: center;

  span {
    font-size: 30px;
    font-weight: bold;
    color: ${colors.primary};
    margin-top: 11px;
  }

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      margin-top: 20px;
      font-weight: bold;
      color: ${colors.fontBold};
      font-size: 14px;

      &:first-child {
        margin-top: 0;
      }
    }

    input {
      margin-top: 8px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      height: 45px;
      padding: 15px 0 13px 13px;

      &::placeholder {
        font-size: 16px;
        color: ${colors.placeholder};
      }
    }

    span {
      color: ${colors.red};
      font-size: 12px;
      font-weight: bold;

      &::before {
        content: '*';
      }
    }

    button {
      margin-top: 15px;
      height: 45px;
      background: ${colors.primary};
      font-size: 16px;
      font-weight: bold;
      color: ${colors.white};
      border-radius: 4px;
      border: 0;
      text-align: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, colors.primary)};
      }
    }
  }
`;
