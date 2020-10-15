import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingIcon = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default LoadingIcon;
