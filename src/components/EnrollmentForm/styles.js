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
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  p {
    font-size: 24px;
    font-weight: bold;
    color: ${colors.fontBold};
  }

  div {
    display: flex;

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

      svg {
        margin-right: 8px;
      }

      &:last-child {
        background: ${colors.primary};
        margin-right: 0;
      }
    }
  }
`;

export const FormBody = styled.div`
  background: ${colors.formBackground};
  padding: 30px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.fontBold};
  }
`;

export const RowInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const InputPlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  max-width: 198px;
  width: 100%;
  margin-top: 20px;

  span {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.fontBold};
  }
`;

export const InputRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  max-width: 198px;
  width: 100%;
  margin-top: 20px;

  &:last-child {
    margin-right: 0;
  }

  span {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.fontBold};
  }

  input {
    height: 38px;
    border-radius: 4px;
    border: 1px solid hsl(0, 0%, 80%);
    padding: 2px 8px;

    &:read-only {
      background: #f5f5f5;
    }
  }

  .react-datepicker__day--selected {
    background: ${colors.primary};

    :hover {
      background: ${lighten(0.1, colors.primary)};
    }
  }

  .react-datepicker__day--keyboard-selected {
    background: ${colors.primary};

    :hover {
      background: ${lighten(0.1, colors.primary)};
    }
  }

  .react-select__control {
    background: ${colors.primary} !important;
  }
`;
