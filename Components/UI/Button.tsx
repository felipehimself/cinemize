import React from 'react';
import { Button as Btn } from '../../ts/types/ui';

const Button = ({ children, className, type }:Btn ): JSX.Element => {
  return (
    <button type={type} className={`${className} transition hover:bg-indigo-800 bg-indigo-600 text-white`}>
      {children}
    </button>
  );
};
export default Button;
