import { Dispatch, SetStateAction } from 'react';
import { toggleForm } from '../features/formSlice';
import { useAppDispatch } from '../store/store';

type TabBtns = {
  followersQty: number;
  followingQty: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
  index:number
};

const TabButtons = ({ followersQty, followingQty, setTabIndex, index }: TabBtns): JSX.Element => {
  const dispatch = useAppDispatch()

  const toggleShowForm = () => {
    dispatch(toggleForm(true))
  }


  return (
    <div className='pt-3 pb-2 text-sm flex items-center justify-between '>
      <div className='flex justify-start gap-6'>
        <button className={`${index === 0 ? 'dark:text-indigo-400 text-indigo-600': undefined }`} onClick={()=>setTabIndex(0)}>Posts</button>

        <button className={`${index === 1 ? 'dark:text-indigo-400 text-indigo-600': undefined }`} onClick={()=>setTabIndex(1)}>{followersQty} seguidores</button>

        <button className={`${index === 2 ? 'dark:text-indigo-400 text-indigo-600': undefined }`} onClick={()=>setTabIndex(2)}>{followingQty} seguindo </button>
      </div>
      <button onClick={toggleShowForm} className='transition hover:bg-indigo-800 bg-indigo-600 text-white py-1 px-2 rounded-md hidden sm:block'>Postar</button>
    </div>
  );
};
export default TabButtons;
