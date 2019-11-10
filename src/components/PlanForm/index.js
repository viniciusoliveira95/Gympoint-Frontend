import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import MaskedPositiveInteger from '../MaskedInputs/PositiveIntger';
import MaskedPriceInput from '../MaskedInputs/Price';
import history from '~/services/history';
import { Container, Content, DivRow, FormInputs, Title } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  duration: Yup.string().required('A duração é obrigatório'),
  price: Yup.string().required('Preço mensal é obrigatório'),
});

export default function PlanForm({ title, handleSubmit, initialData }) {
  const [price, setPrice] = useState('0,00');
  const [months, setMonths] = useState('');

  useEffect(() => {
    if (initialData.price) {
      setMonths(initialData.duration);
      setPrice(initialData.price);
    }
  }, [initialData, initialData.duration, initialData.price]);

  const totalPrice = useMemo(() => {
    const unformattedPrice =
      price.replace(',', '.').replace(' R$', '') * months;
    const formattedPrice = unformattedPrice.toFixed(2).replace('.', ',');
    return formattedPrice;
  }, [price, months]);

  return (
    <Container>
      <Content>
        <Form initialData={initialData} schema={schema} onSubmit={handleSubmit}>
          <div>
            <Title>{title}</Title>
            <div>
              <button onClick={() => history.push('/plans')} type="button">
                <MdKeyboardArrowLeft size={20} color="#FFFFFF" />
                VOLTAR
              </button>
              <button type="submit">
                <MdCheck size={20} color="#FFFFFF" />
                SALVAR
              </button>
            </div>
          </div>
          <FormInputs>
            <Input
              label="TÍTULO DO PLANO"
              name="title"
              id="title"
              type="text"
            />
            <DivRow>
              <label htmlFor="duration">
                {' '}
                DURAÇÃO (em meses)
                <MaskedPositiveInteger
                  name="duration"
                  value={months}
                  onChange={e => setMonths(e.target.value)}
                />
              </label>
              <label htmlFor="price">
                {' '}
                PREÇO MENSAL
                <MaskedPriceInput
                  name="price"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </label>
              <label htmlFor="totalPrice">
                {' '}
                PREÇO TOTAL
                <Input
                  readOnly
                  name="totalPrice"
                  id="totalPrice"
                  type="text"
                  value={`${totalPrice} R$`}
                />
              </label>
            </DivRow>
          </FormInputs>
        </Form>
      </Content>
    </Container>
  );
}

PlanForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    duration: PropTypes.string,
    price: PropTypes.string,
  }),
};

PlanForm.defaultProps = {
  initialData: {},
};
