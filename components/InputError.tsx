import React from 'react';

type Children = {
  children: React.ReactNode;
};

const InputError = ({ children }: Children): JSX.Element => {
  return (
    <small className='text-red-600 dark:text-slate-200 text-xs block min-h-[20px] pl-1'>
      {children}
    </small>
  );
};
export default InputError;
