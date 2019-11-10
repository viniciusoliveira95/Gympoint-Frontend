import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  Container,
  Content,
  CreateButton,
  Table,
  TableContainer,
} from './styles';

export default function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  async function handleDelete(id, planTitle) {
    const confirmDeletion = window.confirm(
      `Realmente deseja deletear o plano ${planTitle} ?`
    );

    if (!confirmDeletion) return;

    try {
      await api.delete(`plans/${id}`);

      toast.success('Plano deletado com sucesso');

      setPlans(plans.filter(plan => plan.id !== id));
    } catch (error) {
      toast.error('Falha ao deletar o plano');
    }
  }

  return (
    <Container>
      <Content>
        <div>
          <span>Gerenciando planos</span>
          <CreateButton
            onClick={() => history.push('/plans/create')}
            type="button"
          >
            <MdAdd size={20} color="#FFFFFF" />
            CADASTRAR
          </CreateButton>
        </div>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <th>TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR p/ MÊS</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={String(plan.id)}>
                  <td>{plan.title}</td>
                  <td>{plan.duration}</td>
                  <td>{`${plan.price} R$`}</td>
                  <td>
                    <Link to={`/plans/update/${plan.id}`}>editar</Link>
                    <button
                      onClick={() => handleDelete(plan.id, plan.title)}
                      type="button"
                    >
                      apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Content>
    </Container>
  );
}
