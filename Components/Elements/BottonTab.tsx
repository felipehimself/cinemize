import Link from "next/link";
import { IoBookmark, IoHome, IoPerson, IoSearch } from "react-icons/io5";

const BottonTab = () => {
  return (
    <div className='fixed md:hidden bg-indigo-600 dark:bg-darker w-full bottom-0 left-0 right-0'>
      <nav className=' container mx-auto flex justify-between'>
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
            <Link href='/home'>
              <a>
                <IoBookmark className=' fill-white dark:fill-white' size={22} />
              </a>
            </Link>
          </li>
          <li className='py-3 '>
            <Link href='/home'>
              <a>
                <IoSearch className=' fill-white dark:fill-white' size={22} />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default BottonTab;
