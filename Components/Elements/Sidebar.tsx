import Link from 'next/link';
import { IoHome, IoPeople, IoBookmark , IoPerson} from 'react-icons/io5';
import ColorMode from '../ColorMode/ColorMode';
const Sidebar = () => {
  return (
    <div className='fixed border-r- top-12 py-3 left-10 w-56 h-screen '>
      <h2 className='text-xl'>cine<span className='text-indigo-600'>.</span>mize</h2>
      <nav className=''>
        
        <ul className='flex flex-col '>
        <li className='  py-3 '>
            <Link href='/home'>
              <a className=' flex items-center gap-3 text-lg'>
                <IoPerson className='-mt-1 fill-gray-600 dark:fill-white' size={18} />
                Profile
              </a>
            </Link>
          </li>

          <li className='  py-3 '>
            <Link href='/home'>
              <a className='flex items-center gap-3 text-lg'>
                <IoHome className='-mt-1 fill-gray-600 dark:fill-white' size={18} />
                Home
              </a>
            </Link>
          </li>
          <li className='  py-3 '>
            <Link href='/home'>
              <a className='flex items-center gap-3 text-lg'>
                <IoPeople className='-mt-1 fill-gray-600 dark:fill-white' size={18} />
                Friends
              </a>
            </Link>
          </li>
          <li className='  py-3 '>
            <Link href='/home'>
              <a className='flex items-center gap-3 text-lg'>
                <IoBookmark className='-mt-1 fill-gray-600 dark:fill-white' size={18} />
                Favorites
              </a>
            </Link>

          </li>
        </ul>
      </nav>
      <div className='absolute md:hidden left-0 bottom-20'>
        <div className=''>
          <ColorMode className='fill-white' size={19} />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
