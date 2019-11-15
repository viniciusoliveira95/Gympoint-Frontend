import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Loading from '~/components/Loading';
import AnswerModal from '~/components/AnswerModal';
import PaginateButtons from '~/components/PaginateButtons';

import { Container, Content, Table, TableContainer } from './styles';

export default function HelpOrder() {
  const [helpOrders, setHelpOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState({});

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        const response = await api.get('help-orders', {
          params: {
            page,
          },
        });

        const { helpOrderList, ...paginateInfo } = response.data;

        setPaginate(paginateInfo);
        setHelpOrder(helpOrderList);
        setLoading(false);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : 'Falha ao carregar pedidos de ajuda';
        toast.error(errorMessage);
        setLoading(false);
      }
    }

    loadHelpOrders();
  }, [page]);

  async function loadMore() {
    try {
      const response = await api.get('help-orders', {
        params: {
          page,
        },
      });

      const { helpOrderList, ...paginateInfo } = response.data;

      setPaginate(paginateInfo);
      setHelpOrder(helpOrderList);
      setLoading(false);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Falha ao carregar pedidos de ajuda';
      toast.error(errorMessage);
      setLoading(false);
    }
  }

  async function handleAnswer(e, setIsOpen) {
    try {
      await api.put(`help-orders/${e.id}/answer`, {
        answer: e.answer,
      });

      toast.success('Resposta enviada');

      setIsOpen(false);
      loadMore();
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : 'Falha ao enviar a resposta';
      toast.error(errorMessage);
    }
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
            <span>Pedidos de auxílio</span>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>ALUNO</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {helpOrders.map(helpOrder => (
                    <tr key={String(helpOrder.id)}>
                      <td>{helpOrder.student.name}</td>
                      <td>
                        <AnswerModal
                          questionId={helpOrder.id}
                          onSubmit={handleAnswer}
                          question={helpOrder.question}
                        />
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
