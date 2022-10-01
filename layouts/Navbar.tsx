import { IoHome, IoBookmark, IoPerson, IoNotifications, IoSearch } from 'react-icons/io5';
import Link from 'next/link';


const Navbar = ({className}:{className:string}):JSX.Element => {
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
                <a >
                  <IoPerson className=' fill-white dark:fill-white' size={22} />
                </a>
              </Link>
            </li>
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
            <li className='py-3 '>
            <Link href='/home'>
              <a>
                <IoSearch className=' md:hidden fill-white dark:fill-white' size={22} />
              </a>
            </Link>
          </li>
          </ul>
        </nav>
  )
}
export default Navbar