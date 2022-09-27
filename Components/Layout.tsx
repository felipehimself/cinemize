import React, { useState, useEffect } from 'react';
import Header from './Elements/Header';
import { useRouter } from 'next/router';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const router = useRouter();
  const [hasHeader, setHasHeader] = useState(false);
  const { pathname } = router;

  useEffect(()=> {

    const checkPathame = () => {
      const { pathname } = router;
  
      switch (pathname) {
        case '/':
          setHasHeader(false)
          break;
  
        case '/login':
          setHasHeader(false)
          break;
  
        default:
          setHasHeader(true);
      }
    };

    checkPathame()

  },[pathname, router])

  

  return (
    <>
      {hasHeader && <Header />}
      <main className={`container mx-auto ${hasHeader? 'py-14' : undefined }`}>{children}</main>
    </>
  );
};
export default Layout;
