import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import StudentForm from '~/components/StudentForm';

export default function StudentUpdate() {
  const [student, setStudent] = useState({});
  const { studentId } = useParams();

  useEffect(() => {
    async function loadStudent() {
      try {
        const response = await api.get(`students/${studentId}`);

        const studentData = response.data;

        studentData.peso = studentData.peso.replace('.', ',');
        studentData.altura = studentData.altura.replace('.', ',');

        setStudent(studentData);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : 'Falha ao carregar aluno';
        toast.error(errorMessage);
        history.push('/students');
      }
    }

    loadStudent();
  }, [studentId]);

  async function handleSubmit(fields) {
    try {
      await api.put(`students/${studentId}`, {
        name: fields.name,
        email: fields.email,
        idade: fields.idade,
        peso: parseFloat(fields.peso.replace(',', '.').replace('Kg', '')),
        altura: parseFloat(fields.altura.replace(',', '.').replace('m', '')),
      });
      toast.success('Cadastro de estudante editado com sucesso');
      history.push('/students');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Falha ao editar aluno';
      toast.error(errorMessage);
      history.push('/students');
    }
  }

  return (
    <StudentForm
      initialData={student}
      title="Edição de aluno"
      handleSubmit={handleSubmit}
    />
  );
}
