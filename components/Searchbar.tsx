import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { useRouter } from 'next/router';
import { UserProfile } from './../ts/types/user';
import { useAppDispatch } from '../store/store';
import { toggleSearch } from '../features/searchSlice';

const Searchbar = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLDivElement>(null);


  const handleGetUser = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    try {
      const res = await axios.get('/api/user/user', {
        params: {
          term: value,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigation = (userName: string) => {
    setUsers([])
    dispatch(toggleSearch(false))
    router.push(`/user/${userName}`);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: React.MouseEvent<HTMLElement>) => {
      
      if (
        isAutocompleteOpen &&
        inputRef.current &&
        // @ts-ignore
        !inputRef.current?.contains(e.target)
      ) {
        setIsAutocompleteOpen(false);
      }
    };
    // @ts-ignore
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isAutocompleteOpen]);
  return (
    <div ref={inputRef} className='w-full relative'>
      <input
        placeholder='Buscar usuário...'
        type='text'
        className='
         w-full
         dark:border-darker 
         rounded-md 
         py-1
         px-2
         dark:focus:outline-none focus:outline-none border focus:border-indigo-600 border-gray-300'
        name='user'
        id='user'
        onChange={handleGetUser}
        onFocus={() => setIsAutocompleteOpen(true)}
        autoComplete='off'
      />
      {isAutocompleteOpen && (
        <ul className='absolute rounded-md dark:bg-lightDark bg-white shadow-md w-full overflow-hidden '>
          {users?.map((user) => {
            return (
              <li
                key={user?.userId}
                className='hover:bg-slate-100 dark:hover:bg-darker '
              >
                <button
                  className='w-full pl-2 py-1 text-left flex items-center gap-1'
                  onClick={() => handleNavigation(user.userName)}
                >
                  {user.userName} <span>{user.isVerified && <MdVerified />}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Searchbar;
