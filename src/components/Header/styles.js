import styled from 'styled-components';
import { lighten } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: ${colors.white};
  padding: 0 30px;
  border: 1px solid #dddddd;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 12px;
    }

    span {
      font-size: 15px;
      font-weight: bold;
      color: ${colors.primary};
      margin-right: 30px;
      padding-right: 30px;
      height: 32px;
      display: flex;
      align-items: center;
      border-right: 1px solid #dddddd;
    }

    a {
      font-size: 15px;
      font-weight: bold;
      color: ${colors.navLinks};
      margin-right: 20px;
    }

    a.active {
      color: ${colors.fontBold};
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: ${colors.fontPrimary};
  }

  button {
    color: ${colors.red};
    font-size: 14px;
    background: ${colors.white};
    border: 0;
    transition: color 0.3s;

    &:hover {
      color: ${lighten(0.1, colors.red)};
    }
  }
`;
