import { Input } from '../UI/Index';
import { IoHome, IoPeople, IoBookmark, IoPerson } from 'react-icons/io5';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='fixed z-10 shadow-md shadow-indigo-500/40 dark:shadow-dark  py-4  left-0 right-0 w-full bg-indigo-600 dark:bg-darker'>
      <div className='container bg-slate-500 flex items-center gap-10'>
        <h3 className='text-xl text-white'>cine.mize</h3>

        <nav className=''>
          <ul className='flex gap-4 '>
            <li className='  py-3 '>
              <Link href='/home'>
                <a className=' '>
                  <IoPerson
                    className=' fill-white dark:fill-white'
                    size={18}
                  />
                </a>
              </Link>
            </li>

            <li className='  py-3 '>
              <Link href='/home'>
                <a className=''>
                  <IoHome
                    className=' fill-white dark:fill-white'
                    size={18}
                  />
                </a>
              </Link>
            </li>
            <li className='  py-3 '>
              <Link href='/home'>
                <a className=''>
                  <IoPeople
                    className=' fill-white dark:fill-white'
                    size={18}
                  />
                </a>
              </Link>
            </li>
            <li className='  py-3 '>
              <Link href='/home'>
                <a className=''>
                  <IoBookmark
                    className=' fill-white dark:fill-white'
                    size={18}
                  />
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className='hidden w-5/12 md:block '>
          <Input
            placeHolder='Search user...'
            type='text'
            className='w-full dark:border-darker focus:outline-indigo-700 rounded-md py-1 px-2'
          />
        </div>
        <div className='hidden mr-4  text-white md:block'>
          {/* pensar depois como fazer notificação */}
          {/* Notificações */}
        </div>
      </div>
    </header>
  );
};
export default Header;
