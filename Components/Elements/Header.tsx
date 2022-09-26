import Link from 'next/link';

import  Input  from '../UI/Input';
import ColorMode from '../ColorMode/ColorMode';

import { IoHome, IoPeople, IoBookmark, IoPerson, IoNotifications } from 'react-icons/io5';


const Header = () => {
  return (
    <header className='fixed flex items-center min-h-[48px] z-10 shadow-md  shadow-indigo-500/40 dark:shadow-dark  py-1  left-0 right-0 w-full bg-indigo-600 dark:bg-darker'>
      <div className='flex items-center gap-4 justify-between container mx-auto'>
        <h3 className='text-xl text-white'>
          cine<span className='dark:text-indigo-600'>.</span>mize
        </h3>

        <nav className='hidden md:flex justify-center flex-1 '>
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
                <a >
                  <IoPerson className=' fill-white dark:fill-white' size={22} />
                </a>
              </Link>
            </li>
            {/* <li className='py-3 '>
              <Link href='/home'>
                <a>
                  <IoPeople className=' fill-white dark:fill-white' size={24} />
                </a>
              </Link>
            </li> */}
            <li className='py-3 '>
              <Link href='/home'>
                <a>
                  <IoBookmark
                    className=' fill-white dark:fill-white'
                    size={22}
                  />
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className='hidden flex-1 -ml-3  md:block '>
            <Input
              placeHolder='Search user...'
              type='text'
              className='w-full dark:border-darker  rounded-md py-1 px-2'
              name='user'
              id='user'
              onChange={()=>{}}
              value=''
            />
          </div>
        <div className='flex items-center  gap-4 '>
         
          <div className='text-white md:block'>
            {/* pensar depois como fazer notificação */}
            <IoNotifications size={20} />
          </div>
          <div className='flex items-center'>
            <ColorMode size={20} className='fill-white ' />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
