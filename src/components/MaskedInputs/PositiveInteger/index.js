import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useField } from '@rocketseat/unform';

export default function MaskedPositiveInteger({ name, onChange, value }) {
  const PositiveInteger = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    integerLimit: 3,
  });

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
        mask={PositiveInteger}
        value={value}
        onChange={onChange}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskedPositiveInteger.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
