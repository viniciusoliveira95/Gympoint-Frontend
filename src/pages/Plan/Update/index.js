import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import PlanForm from '~/components/PlanForm';

export default function PlanUpdate() {
  const [plan, setPlan] = useState({});
  const { planId } = useParams();

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`plans/${planId}`);

        const planData = response.data;

        planData.price = planData.price.replace('.', ',');
        planData.duration = planData.duration.toString();

        setPlan(planData);
      } catch ({ response }) {
        toast.error(response.data.error);
        history.push('/plans');
      }
    }

    loadPlan();
  }, [planId]);

  async function handleSubmit(fields) {
    try {
      await api.put(`plans/${planId}`, {
        title: fields.title,
        duration: parseInt(fields.duration, 10),
        price: parseFloat(fields.price.replace(',', '.').replace(' R$', '')),
      });

      toast.success('Plano editado com sucesso');
      history.push('/plans');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <PlanForm
      title="Cadastro de plano"
      handleSubmit={handleSubmit}
      initialData={plan}
    />
  );
}
