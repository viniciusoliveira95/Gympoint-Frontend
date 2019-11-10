import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { useField } from '@rocketseat/unform';

export default function MaskedHeightInput({ name, initialHeight }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [height, setHeight] = useState('');

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
        mask={[/\d/, ',', /\d/, /\d/]}
        guide={false}
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
