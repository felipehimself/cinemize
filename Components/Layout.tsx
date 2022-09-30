import React, { useState, useEffect } from 'react';
import Header from './Elements/Header';
import { useRouter } from 'next/router';
import BottonTab from './Elements/BottonTab';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const router = useRouter();
  const [hasComponent, setHasComponent] = useState(false);
  const { pathname } = router;

  useEffect(()=> {

    const checkPathame = () => {
      const { pathname } = router;
  
      switch (pathname) {
        case '/':
          setHasComponent(false)
          break;
  
        case '/login':
          setHasComponent(false)
          break;
  
        default:
          setHasComponent(true);
      }
    };

    checkPathame()

  },[pathname, router])

  

  return (
    <>
      {hasComponent && <Header />}
      <main className={`container mx-auto ${hasComponent? 'py-14' : undefined }`}>{children}</main>
      {hasComponent && <BottonTab/>}
    </>
  );
};
export default Layout;
