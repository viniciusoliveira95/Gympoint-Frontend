import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Table, TableContainer } from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: {
          page,
          name,
        },
      });

      setStudents(response.data);
    }

    loadStudents();
  }, [name, page]);

  function handleSearch() {
    const searchName = document.getElementById('searchName').value;
    setName(searchName);
  }

  function handleEnterSearch(e) {
    if (e.key === 'Enter') {
      const searchName = document.getElementById('searchName').value;
      setName(searchName);
    }
  }

  async function handleDelete(id, studentName) {
    const confirmDeletion = window.confirm(
      `Realmente deseja deletear o(a) estudante ${studentName} ?`
    );

    if (!confirmDeletion) return;

    try {
      await api.delete(`students/${id}`);

      toast.success('Estudante deletado com sucesso');

      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      toast.error('Falha ao deletar o estudante');
    }
  }

  return (
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
                      color={student.activeEnrollment ? '#42cb59' : '#dddddd'}
                    />
                  </td>
                  <td>
                    <Link to={`/students/update/${student.id}`}>editar</Link>
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
      </Content>
    </Container>
  );
}
