import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

import api from '~/services/api';
import history from '~/services/history';

import Loading from '~/components/Loading';
import PaginateButtons from '~/components/PaginateButtons';

import { Container, Content, Table, TableContainer } from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [paginate, setPaginate] = useState({});

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get('students', {
          params: {
            page,
            name,
          },
        });

        const { studentList, ...paginateInfo } = response.data;

        setStudents(studentList);
        setPaginate(paginateInfo);
        setLoading(false);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : 'Falha ao carregar alunos';
        toast.error(errorMessage);
        setLoading(false);
      }
    }

    loadStudents();
  }, [name, page]);

  function handleSearch() {
    const searchName = document.getElementById('searchName').value;
    setName(searchName);
    setPage(1);
  }

  function handleEnterSearch(e) {
    if (e.key === 'Enter') {
      const searchName = document.getElementById('searchName').value;
      setName(searchName);
      setPage(1);
    }
  }

  function handleDelete(id, studentName) {
    swal({
      title: `Realmente deseja apagar o(a) estudante ${studentName} ?`,
      text:
        'Matrículas, pedidos de auxílio e checkins relacionado ao estudante também serão apagados',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async willDelte => {
      if (willDelte) {
        try {
          await api.delete(`students/${id}`);

          toast.success('Aluno deletado com sucesso');

          setStudents(students.filter(student => student.id !== id));
        } catch (error) {
          const errorMessage = error.response
            ? error.response.data.error
            : 'Falha ao deletar aluno';
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
              <span>Gerenciando alunos</span>
              <div>
                <button
                  onClick={() => history.push('/students/create')}
                  type="button"
                >
                  <MdAdd size={20} color="#FFFFFF" />
                  CADASTRAR
                </button>
                <div>
                  <MdSearch
                    onClick={() => handleSearch()}
                    size={16}
                    color="#999999"
                  />
                  <input
                    onKeyPress={handleEnterSearch}
                    id="searchName"
                    type="text"
                    placeholder="Buscar aluno"
                  />
                </div>
              </div>
            </div>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>NOME</th>
                    <th>E-MAIL</th>
                    <th>IDADE</th>
                    <th>MATRICULA ATIVA</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={String(student.id)}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.idade}</td>
                      <td>
                        <MdCheckCircle
                          size={20}
                          color={
                            student.activeEnrollment ? '#42cb59' : '#dddddd'
                          }
                        />
                      </td>
                      <td>
                        <Link to={`/students/update/${student.id}`}>
                          editar
                        </Link>
                        <button
                          onClick={() => handleDelete(student.id, student.name)}
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
