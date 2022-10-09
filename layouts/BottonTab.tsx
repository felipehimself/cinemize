import Link from "next/link";
import { IoBookmark, IoHome, IoNotifications, IoPerson, IoSearch } from "react-icons/io5";
import { toggleSearch } from "../features/searchSlice";
import { toggleNotification } from "../features/notificationSlice";
import { useAppDispatch } from "../store/store";

const BottonTab = ({ hasNotification }:{ hasNotification: boolean | undefined }):JSX.Element => {

  const dispatch = useAppDispatch();

  const handleShowSearch = () => {
    dispatch(toggleSearch(true));
  };


  const handleShowNotification = () => {
    dispatch(toggleNotification(true));
  };


  return (
    <div className='fixed z-40 min-h-[60px] flex items-center justify-center md:hidden bg-indigo-600 dark:bg-darker w-full bottom-0 left-0 right-0'>
      <nav className='w-full'>
      <ul className='flex flex-1 justify-evenly items-center  '>
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
        <li className='py-3 flex items-center'>
          <button onClick={handleShowSearch}>
            <IoSearch className='fill-white dark:fill-white' size={22} />
          </button>
        </li>
        <li className='py-3  flex items-center'>
        <button
              onClick={handleShowNotification}
              className='relative sm:block'
            >
              {hasNotification && (
                <span className='absolute w-[10px] h-[10px] bg-red-500 rounded-full right-0 -top-[3px]'></span>
              )}
              <IoNotifications size={20} className='text-white' />
            </button>
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
    </div>
  );
};
export default BottonTab;
