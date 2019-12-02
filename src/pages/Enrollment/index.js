import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
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

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState({});

  useEffect(() => {
    console.tron.log(`loaded${loading}`);
    async function loadEnrollments() {
      try {
        const response = await api.get('enrollments', {
          params: {
            page,
          },
        });
        const { enrollmentList, ...paginateInfo } = response.data;

        enrollmentList.map(student => {
          student.start_date = format(
            parseISO(student.start_date),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          );

          student.end_date = format(
            parseISO(student.end_date),
            "d 'de' MMMM 'de' yyyy",
            { locale: pt }
          );

          return student;
        });

        setEnrollments(enrollmentList);
        setPaginate(paginateInfo);
        setLoading(false);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : 'Falha ao carregar matrículas';
        toast.error(errorMessage);
        setLoading(false);
      }
    }

    loadEnrollments();
  }, [loading, page]);

  async function handleDelete(id, studentName) {
    swal({
      title: `Realmente deseja apagar a matrícula do estudante ${studentName} ?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async willDelte => {
      if (willDelte) {
        try {
          await api.delete(`enrollments/${id}`);

          toast.success('Matrícula deletado com sucesso');

          setEnrollments(
            enrollments.filter(enrollment => enrollment.id !== id)
          );
        } catch (error) {
          const errorMessage = error.response
            ? error.response.data.error
            : 'Falha ao deletar a matrícula';
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
              <span>Gerenciando matrículas</span>
              <CreateButton
                onClick={() => history.push('/enrollments/create')}
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
                    <th>ALUNO</th>
                    <th>PLANO</th>
                    <th>INÍCIO</th>
                    <th>TÉRMINO</th>
                    <th>ATIVA</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(enrollment => (
                    <tr key={String(enrollment.id)}>
                      <td>{enrollment.student.name}</td>
                      <td>
                        {enrollment.plan === null ? '' : enrollment.plan.title}
                      </td>
                      <td>{enrollment.start_date}</td>
                      <td>{enrollment.end_date}</td>
                      <td>
                        <MdCheckCircle
                          size={20}
                          color={enrollment.active ? '#42cb59' : '#dddddd'}
                        />
                      </td>
                      <td>
                        <Link to={`/enrollments/update/${enrollment.id}`}>
                          editar
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(enrollment.id, enrollment.student.name)
                          }
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
