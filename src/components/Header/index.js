import React from 'react';
import { NavLink } from 'react-router-dom';
import headerLogo from '~/assets/headerLogo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={headerLogo} alt="GymPoint" />
          <span>GYMPOINT</span>
          <NavLink to="/students">ALUNOS</NavLink>
          <NavLink to="/plans">PLANOS</NavLink>
          <NavLink to="/enrollments">MATRÍCULAS</NavLink>
          <NavLink to="/helporders">PEDIDOS DE AUXÍLIO</NavLink>
        </nav>
        <Profile>
          <span>Vinicius Oliveira</span>
          <NavLink to="/">Sair do sistema</NavLink>
        </Profile>
      </Content>
    </Container>
  );
}
