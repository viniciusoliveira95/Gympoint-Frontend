import React from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import PlanForm from '~/components/PlanForm';

export default function PlanCreate() {
  async function handleSubmit(fields) {
    try {
      await api.post('/plans', {
        title: fields.title,
        duration: parseInt(fields.duration, 10),
        price: parseFloat(fields.price.replace(',', '.').replace(' R$', '')),
      });

      toast.success('Plano criado com sucesso');
      history.push('/plans');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return <PlanForm title="Cadastro de plano" handleSubmit={handleSubmit} />;
}
