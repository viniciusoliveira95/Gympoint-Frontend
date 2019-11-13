import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Container, Content } from './styles';

export default function Loading() {
  return (
    <Container>
      <Content>
        Carregando <FaSpinner size={40} color="#EE4D64" />
      </Content>
    </Container>
  );
}
