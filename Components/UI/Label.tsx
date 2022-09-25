import React from 'react';
import { Label as Lbl } from '../../ts/types/ui';

const Label = ({ children, className, htmlFor }: Lbl): JSX.Element => {
  return (
    <label htmlFor={htmlFor} className={`${className} block text-md `}>
      {children}
    </label>
  );
};
export default Label;
