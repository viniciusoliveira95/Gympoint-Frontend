import React from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import StudentForm from '~/components/StudentForm';

export default function StudentCreate() {
  async function handleSubmit(fields) {
    try {
      await api.post('/students', {
        name: fields.name,
        email: fields.email,
        idade: fields.idade,
        peso: parseFloat(fields.peso.replace(',', '.').replace('Kg', '')),
        altura: parseFloat(fields.altura.replace(',', '.').replace('m', '')),
      });
      toast.success('Cadastro de aluno criado com sucesso');
      history.push('/students');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Falha ao criar aluno';
      toast.error(errorMessage);
    }
  }

  return <StudentForm title="Cadastro de aluno" handleSubmit={handleSubmit} />;
}
