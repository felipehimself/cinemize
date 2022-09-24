import React from 'react';
import { Ui } from '../../ts/types/ui';

const Button = ({ children, className }: Ui): JSX.Element => {
  return (
    <button type='button' className={`${className} transition hover:bg-indigo-800 bg-indigo-600 text-white`}>
      {children}
    </button>
  );
};
export default Button;
