import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PaginateButtons({
  prevDisabled,
  nextDisabled,
  prevPage,
  nextPage,
}) {
  return (
    <Container>
      <button type="button" onClick={() => prevPage()} disabled={prevDisabled}>
        Anterior
      </button>
      <button type="button" onClick={() => nextPage()} disabled={nextDisabled}>
        Próxima
      </button>
    </Container>
  );
}

PaginateButtons.propTypes = {
  prevDisabled: PropTypes.bool,
  nextDisabled: PropTypes.bool,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

PaginateButtons.defaultProps = {
  prevDisabled: false,
  nextDisabled: false,
};
