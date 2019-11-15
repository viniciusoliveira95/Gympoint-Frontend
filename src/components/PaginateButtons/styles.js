import styled from 'styled-components';
import { lighten } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    height: 35px;
    width: 100px;
    border: 0;
    border-radius: 4px;
    background: ${colors.primary};
    color: ${colors.white};
    font-weight: bold;
    text-align: center;
    transition: background 0.5s;

    &:hover {
      background: ${lighten(0.05, colors.primary)};
    }

    &:disabled {
      visibility: hidden;
    }
  }
`;
