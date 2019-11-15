import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import headerLogo from '~/assets/headerLogo.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const disPatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  function handleLogOut() {
    disPatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={headerLogo} alt="GymPoint" />
          <span>GYMPOINT</span>
          <NavLink to="/students">ALUNOS</NavLink>
          <NavLink to="/plans">PLANOS</NavLink>
          <NavLink to="/enrollments">MATRÍCULAS</NavLink>
          <NavLink to="/helpOrders">PEDIDOS DE AUXÍLIO</NavLink>
        </nav>
        <Profile>
          <span>{user.name}</span>
          <button type="button" onClick={handleLogOut}>
            Sair do sistema
          </button>
        </Profile>
      </Content>
    </Container>
  );
}
