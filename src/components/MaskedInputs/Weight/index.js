import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useField } from '@rocketseat/unform';

export default function MaskedWeightInput({ name, initialWeight }) {
  const weightMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 1,
    integerLimit: 5,
    decimalSymbol: ',',
  });

  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [weight, setWeight] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });

    setWeight(initialWeight);
  }, [ref.current, fieldName, initialWeight]); // eslint-disable-line

  return (
    <>
      <MaskedInput
        id={fieldName}
        ref={ref}
        name={fieldName}
        mask={weightMask}
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskedWeightInput.propTypes = {
  name: PropTypes.string.isRequired,
  initialWeight: PropTypes.string,
};

MaskedWeightInput.defaultProps = {
  initialWeight: '',
};
