import React from 'react';

const Form = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return <form className={` ${className} flex flex-col `}>{children}</form>;
};
export default Form;
