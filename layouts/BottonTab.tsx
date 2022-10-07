import Link from "next/link";
import { IoBookmark, IoHome, IoPerson, IoSearch } from "react-icons/io5";
import Navbar from "./Navbar";

const BottonTab = () => {
  return (
    <div className='fixed min-h-[60px] flex items-center justify-center md:hidden bg-indigo-600 dark:bg-darker w-full bottom-0 left-0 right-0'>
      <Navbar className="justify-center" />
    </div>
  );
};
export default BottonTab;
