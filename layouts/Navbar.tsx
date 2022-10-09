import {
  IoHome,
  IoBookmark,
  IoPerson,
  IoNotifications,
  IoSearch,
} from 'react-icons/io5';
import Link from 'next/link';
import { useAppDispatch } from '../store/store';
import { toggleSearch } from '../features/searchSlice';

const Navbar = ({ className }: { className: string }): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleToggleSearch = () => {
    dispatch(toggleSearch(true));
  };

  return (
    <nav className={` ${className}  `}>
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
        <li className='md:hidden py-3 flex items-center'>
          <button onClick={handleToggleSearch}>
            <IoSearch className='fill-white dark:fill-white' size={22} />
          </button>
        </li>
        <li className='py-3 sm:hidden flex items-center'>
        {/* <button
              onClick={handleShowNotification}
              className='hidden relative sm:block'
            >
              {userNotifications?.hasNotification && (
                <span className='absolute w-[10px] h-[10px] bg-red-500 rounded-full right-0 -top-[3px]'></span>
              )}
              <IoNotifications size={20} className='text-white' />
            </button> */}
        </li>
        <li className='py-3 '>
          <Link href='/profile/favorites'>
            <a>
              <IoBookmark className=' fill-white dark:fill-white' size={22} />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
