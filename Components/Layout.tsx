import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <main className='container'>{children}</main>;
};
export default Layout;
