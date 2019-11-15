import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import api from '~/services/api';
import history from '~/services/history';

import Loading from '~/components/Loading';
import EnrollmentForm from '~/components/EnrollmentForm';

export default function EnrollmentUpdate() {
  const [enrollment, setEnrollment] = useState();
  const { enrollmentId } = useParams();

  useEffect(() => {
    async function loadEnrollment() {
      try {
        const response = await api.get(`enrollments/${enrollmentId}`);

        const enrollmentData = response.data;

        enrollmentData.start_date = parseISO(enrollmentData.start_date);

        setEnrollment(enrollmentData);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : 'Falha ao carregar a matrícula';
        toast.error(errorMessage);
        history.push('/enrollments');
      }
    }

    loadEnrollment();
  }, [enrollmentId]);

  async function handleSubmit(fields) {
    try {
      await api.put(`enrollments/${enrollmentId}`, fields);

      toast.success('Matrícula editada com sucesso');
      history.push('/enrollments');
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : 'Falha ao atualizar a matrícula';
      toast.error(errorMessage);
    }
  }

  return (
    <>
      {enrollment ? (
        <EnrollmentForm
          title="Edição de matrícula"
          handleSubmit={handleSubmit}
          initialData={enrollment}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}
