import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useField } from '@rocketseat/unform';

export default function MaskedPriceInput({ name, onChange, value }) {
  const priceMask = createNumberMask({
    prefix: '',
    suffix: ' R$',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 2,
    decimalSymbol: ',',
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
        mask={priceMask}
        value={value}
        onChange={onChange}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskedPriceInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
