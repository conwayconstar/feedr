import React from 'react';

export type ErrorType = {
  error: Error
};

const Error: React.FC<ErrorType> = ({ error }) => (
  <div className="alert alert-danger">
    {error.message}
  </div>
);

export default Error;
