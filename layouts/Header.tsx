import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Searchbar from '../components/Searchbar';
import Logout from '../components/Logout';
import ColorSwitch from '../components/ColorSwitch';

import {
  IoBookmark,
  IoHome,
  IoNotifications,
  IoPerson,
} from 'react-icons/io5';
import { Notification } from '../ts/types/notification';
import Link from 'next/link';


const Header = ({
  userNotifications,
}: {
  userNotifications?: Notification | null;
}): JSX.Element => {
  const [showNotifications, setShowNotifications] = useState(false);

  const btnRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClearShowDot = async () => {
    try {
      await axios.put('/api/notification');
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowNotification = () => {
    setShowNotifications((prev) => !prev);

    if (userNotifications?.hasNotification) {
      handleClearShowDot();
    }
  };


  useEffect(() => {
    const checkIfClickedOutside = (e: React.MouseEvent<HTMLElement>) => {
      if (
        showNotifications &&
        btnRef.current &&
        // @ts-ignore
        !btnRef.current?.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };
    // @ts-ignore
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showNotifications]);

  const handleRedirect = (path: string) => {
    router.push(path);
    setShowNotifications(false);
  };

  return (
    <header className='fixed top-0 flex items-center min-h-[60px] z-40 shadow-md  shadow-indigo-500/40 dark:shadow-dark  py-1  left-0 right-0 w-full bg-indigo-600 dark:bg-darker'>
      <nav className='flex items-center gap-4 justify-between container mx-auto'>
        <h3 className='text-xl text-white'>
          cine<span className='dark:text-indigo-600'>.</span>mize
        </h3>

        <div className='hidden md:flex justify-center flex-1'>
          <ul className='flex flex-1 justify-center items-center gap-4 '>
            <li className='py-3 '>
              <Link href='/home'>
                <a>
                  <IoHome className=' fill-white dark:fill-white' size={22} />
                </a>
              </Link>
            </li>
            <li className='py-3 '>
              <Link href='/profile'>
                <a>
                  <IoPerson className=' fill-white dark:fill-white' size={22} />
                </a>
              </Link>
            </li>
            <li className='py-3 '>
              <Link href='/profile/favorites'>
                <a>
                  <IoBookmark
                    className=' fill-white dark:fill-white'
                    size={22}
                  />
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div className='hidden flex-1 md:block '>
          <Searchbar className='px-2 py-1' />
        </div>
        <div className='relative flex items-center  gap-4 '>
          <div className='hidden md:block' ref={btnRef}>
            <button
              onClick={handleShowNotification}
              className='hidden relative sm:block'
            >
              {userNotifications?.hasNotification && (
                <span className='absolute w-[10px] h-[10px] bg-red-500 rounded-full right-0 -top-[3px]'></span>
              )}
              <IoNotifications size={20} className='text-white' />
            </button>

            {showNotifications && (
              <ul className='hidden sm:flex flex-col gap-1 px-3 py-2 absolute rounded-md dark:bg-darker bg-slate-100 w-64 top-8 right-0 text-sm'>
                {userNotifications?.notifications.length == 0 ||
                userNotifications?.notifications == null ? (
                  <li>Sem notificações</li>
                ) : (
                  userNotifications?.notifications?.map((notification) => {
                    return (
                      <li
                        className='cursor-pointer'
                        onClick={() => handleRedirect(notification.redirect)}
                        key={notification._id}
                      >
                        <span className='font-bold'>
                          {notification.userName}
                        </span>
                        {notification.message}
                      </li>
                    )
                  })
                )}
              </ul>
            )}
          </div>
          <div className=' flex items-center'>
            <ColorSwitch size={20} className='fill-white ' />
          </div>

          <div className='flex items-center'>
            <Logout size={20} className='fill-white ' />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
