import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useRouter } from 'next/router';
import BottonTab from './BottonTab';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SearchModal from '../components/SearchModal';
import axios from 'axios';
import { Notification } from '../ts/types/notification';
const { AnimatePresence } = require('framer-motion');

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [hasComponent, setHasComponent] = useState(false);
  const [userNotifications, setUserNotifications] = useState<Notification | null>(null)

  const router = useRouter();
  const { pathname } = router;

  const { showSearch } = useSelector((state: RootState) => state.showSearch);

  useEffect(() => {
    const checkPathame = () => {
      const { pathname } = router;

      switch (pathname) {
        case '/':
          setHasComponent(false);
          break;

        case '/login':
          setHasComponent(false);
          break;

        default:
          setHasComponent(true);
      }
    };

    checkPathame();
  }, [pathname, router]);

  useEffect(()=>{
    const getNotifications = async () => {
      
      try {
        const res = await axios.get('/api/notification')
        
        setUserNotifications(res.data)
      } catch (error) {
        setUserNotifications(null)
      }


    }
    getNotifications()
    const interval = setInterval(() => getNotifications(), 5000)
    return () => {
      clearInterval(interval);
    }
  },[pathname])


  return (
    <>
      {hasComponent &&  <Header  userNotifications={userNotifications} />}
      <main
        className={`container mx-auto ${hasComponent ? 'py-16' : undefined}`}
      >
        {children}
      </main>
        {hasComponent && <BottonTab />}
      <AnimatePresence>
        {showSearch && <SearchModal />}
      </AnimatePresence>
    </>
  );
};
export default Layout;
