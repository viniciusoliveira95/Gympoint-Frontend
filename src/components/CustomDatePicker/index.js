import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import pt from 'date-fns/locale/pt';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

export default function CustomDatePicker({
  name,
  onChange,
  selected,
  minDate,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <DatePicker
        name={fieldName}
        ref={ref}
        locale="pt"
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Escolha a data"
        minDate={minDate}
      />
      {error && <span>{error}</span>}
    </>
  );
}

CustomDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};

CustomDatePicker.defaultProps = {
  selected: null,
  minDate: null,
};
