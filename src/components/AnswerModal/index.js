import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { StyledModal, ModalButton, ModalContainer } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('O campo resposta deve ser preenchido'),
  id: Yup.number().required(),
});

export default function AnswerModal({ onSubmit, question, questionId }) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <ModalButton onClick={toggleModal}>responder</ModalButton>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <ModalContainer>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>{question}</p>
          <Form schema={schema} onSubmit={e => onSubmit(e, setIsOpen)}>
            <Input
              type="text"
              multiline
              label="SUA RESPOSTA"
              name="answer"
              placeholder="exemplo@email.com"
            />
            <Input name="id" hidden readOnly value={questionId} />
            <button type="submit">Responder aluno</button>
          </Form>
        </ModalContainer>
      </StyledModal>
    </>
  );
}

AnswerModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
};
