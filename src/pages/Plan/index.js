import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

import api from '~/services/api';
import history from '~/services/history';

import Loading from '~/components/Loading';
import PaginateButtons from '~/components/PaginateButtons';

import {
  Container,
  Content,
  CreateButton,
  Table,
  TableContainer,
} from './styles';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState({});

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await api.get('plans', {
          params: {
            page,
          },
        });

        const { planList, ...paginateInfo } = response.data;

        planList.map(plan => {
          plan.price = plan.price.replace('.', ',');
          return plan.price;
        });

        setPlans(planList);
        setPaginate(paginateInfo);
        setLoading(false);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : 'Falha ao carregar planos';
        toast.error(errorMessage);
        setLoading(false);
      }
    }

    loadPlans();
  }, [page]);

  async function handleDelete(id, planTitle) {
    swal({
      title: `Realmente deseja apagar o plano ${planTitle} ?`,
      text:
        'Matrículas que utilizam esse plano ficaram com campo matrícua em branco ',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async willDelte => {
      if (willDelte) {
        try {
          await api.delete(`plans/${id}`);

          toast.success('Plano deletado com sucesso');

          setPlans(plans.filter(plan => plan.id !== id));
        } catch (error) {
          const errorMessage = error.response
            ? error.response.data.error
            : 'Falha ao deletar o plano';
          toast.error(errorMessage);
        }
      }
    });
  }

  function prevPage() {
    if (!paginate.prevPage) return;

    setPage(page - 1);
  }

  function nextPage() {
    if (!paginate.nextPage) return;

    setPage(page + 1);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                      <td>{`R$${plan.price}`}</td>
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
            <PaginateButtons
              prevDisabled={!paginate.prevPage}
              nextDisabled={!paginate.nextPage}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          </Content>
        </Container>
      )}
    </>
  );
}
