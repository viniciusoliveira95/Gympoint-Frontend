import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { useField } from '@rocketseat/unform';

export default function MaskedHeightInput({ name, initialHeight }) {
  const HeightMask = createNumberMask({
    prefix: '',
    suffix: 'm',
    includeThousandsSeparator: false,
    allowDecimal: true,
    decimalLimit: 2,
    integerLimit: 1,
    decimalSymbol: ',',
  });

  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [height, setHeight] = useState(' ');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });

    setHeight(initialHeight);
  }, [ref.current, fieldName, initialHeight]); // eslint-disable-line

  return (
    <>
      <MaskedInput
        id={fieldName}
        ref={ref}
        name={fieldName}
        mask={HeightMask}
        value={height}
        onChange={e => setHeight(e.target.value)}
      />
      {error && <span>{error}</span>}
    </>
  );
}

MaskedHeightInput.propTypes = {
  name: PropTypes.string.isRequired,
  initialHeight: PropTypes.string,
};

MaskedHeightInput.defaultProps = {
  initialHeight: '',
};
