import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField } from '@rocketseat/unform';

export default function CustomSelect({
  name,
  options,
  defaultValue,
  onChange,
  placeholder,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <Select
        name={fieldName}
        ref={ref}
        aria-label={fieldName}
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        onChange={onChange}
      />

      {error && <span>{error}</span>}
    </>
  );
}

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  placeholder: PropTypes.string,
};

CustomSelect.defaultProps = {
  defaultValue: null,
  placeholder: '',
};
