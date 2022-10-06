import React, { useEffect, useRef, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { useRouter } from 'next/router';
import { UserProfile } from './../ts/types/user';
import { useAppDispatch } from '../store/store';
import { toggleSearch } from '../features/searchSlice';

import axios from 'axios';

const Searchbar = ({className}:{className?:string}):JSX.Element => {
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
        className={`
        ${className}
         w-full
         dark:border-darker 
         rounded-md
         dark:focus:outline-none focus:outline-none border focus:border-indigo-600 border-gray-300`}
        name='user'
        id='user'
        onChange={handleGetUser}
        onFocus={() => setIsAutocompleteOpen(true)}
        autoComplete='off'
      />
      {isAutocompleteOpen && (
        <ul className='absolute mt-[1px] rounded-md dark:bg-lightDark bg-white shadow-md w-full overflow-hidden '>
          {users?.map((user) => {
            return (
              <li
                key={user?.userId}
                className='hover:bg-slate-100 dark:hover:bg-darker '
              >
                <button
                  className={`${className} w-full pl-2  text-left flex items-center gap-1`}
                  onClick={() => handleNavigation(user.userName)}
                >
                  {user.userName} <span>{user.isVerified && <MdVerified size={15} />}</span>
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
