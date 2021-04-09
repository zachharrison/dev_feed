import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinner}
      style={{ width: '400px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </>
);

export default Spinner;
