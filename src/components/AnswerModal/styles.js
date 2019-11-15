import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { lighten } from 'polished';

import colors from '~/styles/colors';

export const ModalButton = styled.button`
  color: ${colors.blue};
  margin-left: 23px;
  font-size: 15px;
  background: ${colors.white};
  border: 0;
  transition: color 0.3s;
  &:hover {
    color: ${lighten(0.1, colors.blue)};
  }
`;

export const StyledModal = Modal.styled`
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 4px;
`;

export const ModalContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;

  strong {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.fontBold};
  }

  p {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 26px;
    color: ${colors.fontPrimary};
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: bold;
      color: ${colors.fontBold};
    }

    textarea {
      height: 127px;
      padding: 13px 15px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      resize: none;
      font-size: 16px;
      color: ${colors.fontPrimary};

      &::placeholder {
        font-size: 16px;
        color: ${colors.placeholder};
      }
    }

    button {
      height: 45px;
      margin-top: 21px;
      border: 0;
      border-radius: 4px;
      background: ${colors.primary};
      color: ${colors.white};
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.03, colors.primary)};
      }
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
