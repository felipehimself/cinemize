import React from 'react';

const Form = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return <div className={` ${className} flex flex-col `}>{children}</div>;
};
export default Form;
