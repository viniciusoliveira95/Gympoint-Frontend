import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { useField } from '@rocketseat/unform';

export default function MaskedPositiveInteger({ name, onChange, value }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <MaskedInput
        id={fieldName}
        ref={ref}
        name={fieldName}
        mask={[/[1-9]/, /[0-9]/, /[0-9]/]}
        value={value}
        onChange={onChange}
        guide={false}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskedPositiveInteger.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
