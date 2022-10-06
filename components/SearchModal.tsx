import { overlayVariants, formVariants } from '../lib/framer';
import Searchbar from './Searchbar';
import { toggleSearch } from '../features/searchSlice';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch } from '../store/store';
const { motion } = require('framer-motion');

const SearchModal = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const toggleShowSearch = () => dispatch(toggleSearch(false))



  return (
    <motion.div
      variants={overlayVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='fixed text-sm z-50 inset-0 flex justify-center bg-[rgba(0,0,0,0.2)] w-full h-full backdrop-blur-[2px]'
    >
      <motion.div
        variants={formVariants}
        className='w-full h-full p-6 bg-white dark:bg-dark'
        onClick={(e: Event) => e.stopPropagation()}
      >
        <div className='flex justify-end mb-2'>
          <button onClick={toggleShowSearch}>
            <IoClose
              size={22}
              className='group-hover:text-indigo-600 group-hover:rotate-90  group-hover:scale-110 dark:group-hover:text-white transition'
            />
          </button>
        </div>

        <Searchbar />
      </motion.div>
    </motion.div>
  );
};
export default SearchModal;
