import { Input } from '../UI/Index';
import { IoHome, IoPeople, IoBookmark, IoPerson } from 'react-icons/io5';
import Link from 'next/link';
import ColorMode from '../ColorMode/ColorMode';
const Header = () => {
  return (
    <header className='fixed z-10 shadow-md  shadow-indigo-500/40 dark:shadow-dark  py-1  left-0 right-0 w-full bg-indigo-600 dark:bg-darker'>
      <div className='flex items-center gap-4 justify-between container mx-auto'>
        <div className='flex items-center flex-1 '>
          <h3 className='text-xl text-white'>cine.mize</h3>
          <nav className='flex justify-center flex-1 '>
            <ul className='flex flex-1 justify-center items-center gap-6 '>
              <li className='  py-3 '>
                <Link href='/home'>
                  <a className=''>
                    <IoHome className=' fill-white dark:fill-white' size={22} />
                  </a>
                </Link>
              </li>
              <li className='  py-3 '>
                <Link href='/home'>
                  <a className=' '>
                    <IoPerson className=' fill-white dark:fill-white' size={22} />
                  </a>
                </Link>
              </li>
              <li className='  py-3 '>
                <Link href='/home'>
                  <a className=''>
                    <IoPeople className=' fill-white dark:fill-white' size={24} />
                  </a>
                </Link>
              </li>
              <li className='  py-3 '>
                <Link href='/home'>
                  <a className=''>
                    <IoBookmark
                      className=' fill-white dark:fill-white'
                      size={22}
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className='flex items-center flex-1 gap-8 justify-between'>
          <div className='hidden flex-1  md:block '>
            <Input
              placeHolder='Search user...'
              type='text'
              className='w-full dark:border-darker  rounded-md py-1 px-2'
            />
          </div>
          <div className='hidden text-white md:block'>
            {/* pensar depois como fazer notificação */}
            {/* Notificações */}
          </div>
          <div>
          <ColorMode size={20} className='fill-white' />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
