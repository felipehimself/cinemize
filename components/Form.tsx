import React from 'react';
import { Form as TypeForm } from '../ts/types/ui';

const Form = ({ children, className, onSubmit }: TypeForm): JSX.Element => {
  return (
    <form onSubmit={onSubmit} className={` ${className} flex flex-col `}>
      {children}
    </form>
  );
};
export default Form;
