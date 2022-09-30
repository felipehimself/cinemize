import { Dispatch, SetStateAction } from 'react';

type TabBtns = {
  followersQty: number;
  followingQty: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
  index:number
};

const TabButtons = ({ followersQty, followingQty, setTabIndex, index }: TabBtns): JSX.Element => {
  return (
    <div className='pt-4 text-sm  flex justify-start gap-6'>
      <button className={`${index === 0 ? 'dark:text-indigo-400 text-indigo-600': undefined }`} onClick={()=>setTabIndex(0)}>Posts</button>
      <button className={`${index === 1 ? 'dark:text-indigo-400 text-indigo-600': undefined }`} onClick={()=>setTabIndex(1)}>{followersQty} seguidores</button>
      <button className={`${index === 2 ? 'dark:text-indigo-400 text-indigo-600': undefined }`} onClick={()=>setTabIndex(2)}>{followingQty} seguindo </button>
    </div>
  );
};
export default TabButtons;
