import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import MaskedWeightInput from '~/components/MaskedInputs/Weight';
import MaskedHeightInput from '~/components/MaskedInputs/Height';
import MaskedPositiveInteger from '~/components/MaskedInputs/PositiveInteger';

import history from '~/services/history';

import { Container, Content, DivRow, FormInputs, Title } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  idade: Yup.string().required('Idade é obrigatório'),
  peso: Yup.string().required('Peso é obrigatório'),
  altura: Yup.string().required('Altura é obrigatório'),
});

export default function StudentForm({ title, handleSubmit, initialData }) {
  const [age, setAge] = useState('');

  useEffect(() => {
    if (initialData.idade) {
      setAge(initialData.idade);
    }
  }, [initialData.idade]);

  return (
    <Container>
      <Content>
        <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
          <div>
            <Title>{title}</Title>
            <div>
              <button onClick={() => history.push('/students')} type="button">
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
              label="NOME COMPLETO"
              name="name"
              id="name"
              type="text"
              placeholder="Seu nome completo"
            />
            <Input
              label="ENDEREÇO DE E-MAIL"
              name="email"
              id="email"
              type="text"
              placeholder="exemplo@email.com"
            />
            <DivRow>
              <label htmlFor="idade">
                {' '}
                IDADE
                <MaskedPositiveInteger
                  name="idade"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                />
              </label>
              <label htmlFor="peso">
                {' '}
                PESO (em Kg)
                <MaskedWeightInput
                  name="peso"
                  initialWeight={initialData.peso}
                />
              </label>
              <label htmlFor="altura">
                {' '}
                ALTURA
                <MaskedHeightInput
                  name="altura"
                  initialHeight={initialData.altura}
                />
              </label>
            </DivRow>
          </FormInputs>
        </Form>
      </Content>
    </Container>
  );
}

StudentForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    idade: PropTypes.number,
    peso: PropTypes.string,
    altura: PropTypes.string,
  }),
};

StudentForm.defaultProps = {
  initialData: {},
};
