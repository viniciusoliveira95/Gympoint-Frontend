import React from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import EnrollmentForm from '~/components/EnrollmentForm';

export default function EnrollmentCreate() {
  async function handleSubmit(fields) {
    try {
      await api.post('enrollments', fields);

      toast.success('Matrícula efetuada com sucesso');
      history.push('/enrollments');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Falha ao efetuar a matrícula';
      toast.error(errorMessage);
    }
  }

  return (
    <EnrollmentForm title="Cadastro de matrícula" handleSubmit={handleSubmit} />
  );
}
