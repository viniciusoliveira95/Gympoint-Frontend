import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';

import history from '~/services/history';
import api from '~/services/api';

import CustomSelect from '~/components/CustomSelect';
import CustomAsyncSelect from '~/components/CustomAsyncSelect';
import CustomDatePicker from '~/components/CustomDatePicker';
import {
  Container,
  Content,
  FormHeader,
  FormBody,
  RowInputs,
  InputContainer,
  InputRowContainer,
  InputPlanContainer,
} from './styles';

export default function EnrollmentForm({ title, initialData, handleSubmit }) {
  const [startDate, setStartDate] = useState(initialData.start_date);
  const [minDate, setMinDate] = useState(new Date());
  const [plans, setPLans] = useState([]);
  const [selectedPLan, setSelectedPLan] = useState(initialData.plan);

  useEffect(() => {
    if (initialData.id) {
      setMinDate(null);
    }

    async function loadPlans() {
      try {
        const response = await api.get('plans');

        setPLans(response.data);
      } catch (error) {
        toast.error('Falha ao carregar planos');
      }
    }

    loadPlans();
  }, [initialData]);

  const endDate = useMemo(() => {
    let endDateMemo = '';
    if (startDate instanceof Date && selectedPLan) {
      endDateMemo = format(
        addMonths(startDate, selectedPLan.duration),
        'dd/MM/yyyy',
        {
          locale: pt,
        }
      );
    }

    return endDateMemo;
  }, [selectedPLan, startDate]);

  const finalPrice = useMemo(() => {
    let formattedPrice = '';

    if (selectedPLan) {
      const unformattedPrice = selectedPLan.duration * selectedPLan.price;
      formattedPrice = `R$${unformattedPrice.toFixed(2).replace('.', ',')}`;
    }

    return formattedPrice;
  }, [selectedPLan]);

  async function loadStudents(name) {
    const response = await api.get('students', {
      params: {
        page: 1,
        name,
      },
    });

    const options = response.data.map(student => ({
      id: student.id,
      name: student.name,
    }));

    return options;
  }

  const loadOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(loadStudents(inputValue));
      }, 1000);
    });

  return (
    <Container>
      <Content>
        <Form initialData={initialData} onSubmit={handleSubmit}>
          <FormHeader>
            <p>{title}</p>
            <div>
              <button
                onClick={() => history.push('/enrollments')}
                type="button"
              >
                <MdKeyboardArrowLeft size={20} color="#FFFFFF" />
                VOLTAR
              </button>
              <button type="submit">
                <MdCheck size={20} color="#FFFFFF" />
                SALVAR
              </button>
            </div>
          </FormHeader>
          <FormBody>
            <InputContainer>
              <span>ALUNO</span>
              <CustomAsyncSelect
                name="student_id"
                placeholder="Buscar aluno"
                cacheOptions
                loadOptions={loadOptions}
                defaultValue={initialData.student}
              />
            </InputContainer>
            <RowInputs>
              <InputPlanContainer>
                <span>PLANO</span>
                <CustomSelect
                  name="plan_id"
                  placeholder="Selecione o plano"
                  options={plans}
                  defaultValue={selectedPLan}
                  onChange={e => setSelectedPLan(e)}
                />
              </InputPlanContainer>
              <InputRowContainer>
                <span>DATA DE INÍCIO</span>
                <CustomDatePicker
                  name="start_date"
                  selected={startDate}
                  minDate={minDate}
                  onChange={date => setStartDate(date)}
                />
              </InputRowContainer>
              <InputRowContainer>
                <span>DATA DE TÉRMINO</span>
                <input readOnly name="end_date" type="text" value={endDate} />
              </InputRowContainer>
              <InputRowContainer>
                <span>VALOR FINAL</span>
                <input name="price" readOnly type="text" value={finalPrice} />
              </InputRowContainer>
            </RowInputs>
          </FormBody>
        </Form>
      </Content>
    </Container>
  );
}

EnrollmentForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    start_date: PropTypes.instanceOf(Date),
    student: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    plan: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      duration: PropTypes.number,
      price: PropTypes.string,
    }),
  }),
};

EnrollmentForm.defaultProps = {
  initialData: {},
};
