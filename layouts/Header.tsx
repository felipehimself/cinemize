import Searchbar from '../components/Searchbar';
import Logout from '../components/Logout';
import ColorSwitch from '../components/ColorSwitch';
import { IoNotifications } from 'react-icons/io5';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className='fixed flex items-center min-h-[48px] z-40 shadow-md  shadow-indigo-500/40 dark:shadow-dark  py-1  left-0 right-0 w-full bg-indigo-600 dark:bg-darker'>
      <div className='flex items-center gap-4 justify-between container mx-auto'>
        <h3 className='text-xl text-white'>
          cine<span className='dark:text-indigo-600'>.</span>mize
        </h3>

        <Navbar className='hidden md:flex justify-center flex-1' />

        <div className='hidden flex-1 md:block '>
         <Searchbar className='px-2 py-1' />
        </div>
        <div className='flex items-center  gap-4 '>
          <div className='text-white md:block'>
            {/* pensar depois como fazer notificação */}
            <IoNotifications size={20} />
          </div>
          <div className='flex items-center'>
            <ColorSwitch size={20} className='fill-white ' />
          </div>

          <div className='flex items-center'>
            <Logout size={20} className='fill-white ' />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
