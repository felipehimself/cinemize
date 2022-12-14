import { MdLocationPin, MdVerified } from 'react-icons/md';
import { UserProfile } from '../ts/types/user';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserProfileCard = ({
  user,
}: {
  user: Omit<UserProfile, 'followers' | 'following'>;
}): JSX.Element => {
  const [userInfo, setUserInfo] = useState({
    ...user,
    userName: user.userName.slice(0, user.name.length + 6),
  });
  const [userInfoBkp, setUserInfoBkp] = useState({
    ...user,
    userName: user.userName.slice(0, user.name.length + 6),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter()
  const refreshProps = () => router.replace(router.asPath);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'description') {
      if (userInfo.description.length < 60) {
        setUserInfo((prev) => ({ ...prev, [name]: value }));
      } else {
        setUserInfo((prev) => ({ ...prev, [name]: value.slice(0, -1) }));
      }
    } else if (name === 'userName') {
      if (userInfo.userName.length < 26) {
        setUserInfo((prev) => ({ ...prev, [name]: value }));
      } else {
        setUserInfo((prev) => ({ ...prev, [name]: value.slice(0, -1) }));
      }
    } else if (name === 'name') {
      if (userInfo.name.length < 30) {
        setUserInfo((prev) => ({ ...prev, [name]: value }));
      } else {
        setUserInfo((prev) => ({ ...prev, [name]: value.slice(0, -1) }));
      }
    } else if (name === 'location') {
      if (userInfo.location.length < 30) {
        setUserInfo((prev) => ({ ...prev, [name]: value }));
      } else {
        setUserInfo((prev) => ({ ...prev, [name]: value.slice(0, -1) }));
      }
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setUserExists(false);

    if(!userInfo.userName.trim()){
      setIsLoading(false);
      return
    }
    const {isVerified, __v, ...rest} = JSON.parse(JSON.stringify(userInfo))

    for (let key in rest){
      rest[key as keyof typeof rest] = rest[key as keyof typeof rest].trim()
    }
  
    try {
      await axios.patch('/api/user/profile', rest);
      refreshProps()
      setIsLoading(false);
      setIsEditing(false);
      setUserInfoBkp(userInfo);
    } catch (error: any) {
      const status = error?.request?.status;
      if (status === 302) {
        setUserExists(true);
      }
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setUserInfo(userInfoBkp);
    setUserExists(false);
    setIsEditing(false);
  };

  // resize width input userName
  // useEffect(() => {
  //   if (inputRef && isEditing) {
  //     // @ts-ignore
  //     inputRef.current.style.width = inputRef.current.value.length + 'ch';
  //   }
  // }, [isEditing, userInfo]);

  // resize height textarea
  useEffect(() => {
    if (textAreaRef && isEditing) {
      // @ts-ignore
      textAreaRef.current.style.height = '1px';
      // @ts-ignore
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [isEditing, userInfo]);
  
  
  return (
    <header className=' w-full  flex-1 flex flex-col gap-4 pt-6'>
      <div className='relative w-full flex flex-col gap-2 border p-3 rounded bg-lightWhite dark:bg-lightDark'>
        {/* BUTTONS */}
        <div className='absolute right-2 top-2'>
          {isEditing ? (
            <div className='flex gap-2'>
              <button
                onClick={handleCancel}
                className='text-xs md:text-sm'
                disabled={isLoading}
              >
                cancelar
              </button>
              <button
                onClick={handleUpdate}
                className='text-xs md:text-sm'
                disabled={isLoading}
              >
                salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className='text-xs md:text-sm'
            >
              editar
            </button>
          )}
        </div>

        {/* USERNAME */}

        {isEditing ? (
          <div className='font-bold text-sm flex items-center absolute left-2 -top-3 bg-light-pattern dark:bg-dark px-1 dark:bg-dark-pattern'>
            <span className='font-bold'>@</span>
            <input
              name='userName'
              value={userInfo.userName || ''}
              className=' font-bold focus:outline-none  bg-light-pattern dark:bg-dark-pattern '
              onChange={handleChange}
              disabled={isLoading}
              maxLength={20}
            />
            {/* {userInfo.isVerified && <MdVerified className='-mb-[1px] fill-indigo-600 dark:fill-white' />} */}
          </div>
        ) : (
          <span className='font-bold flex items-center gap-1 text-sm absolute left-2 -top-3 bg-light-pattern dark:bg-dark px-1 dark:bg-dark-pattern '>
            @{userInfo.userName.slice(0, userInfo.name.length + 6)}
            {userInfo.isVerified && <MdVerified className='-mb-[1px] fill-indigo-600 dark:fill-white' />}
          </span>
        )}
        <span className='text-xs -mt-1 -mb-2 text-red-400 min-h-[16px]'>
          {userExists && 'Nome de usu??rio j?? existe'}
        </span>

        {/* NAME */}
        <div className='flex items-center justify-between'>
          <input
            className='text-sm w-full focus:outline-none bg-lightWhite dark:bg-lightDark'
            onChange={handleChange}
            value={userInfo.name ?? ''}
            disabled={!isEditing || isLoading}
            name='name'
            maxLength={30}
          />
        </div>

        {/* DESCRIPTION */}
        <div className='flex gap-1'>
          {isEditing ? (
            <>
              <textarea
                placeholder='Bio'
                className='-mt-1 w-full text-sm  focus:outline-none bg-lightWhite dark:bg-transparent resize-none'
                disabled={!isEditing || isLoading}
                name='description'
                value={userInfo.description ?? ''}
                onChange={handleChange}
                ref={textAreaRef}
                maxLength={60}
              />
              <span className='text-[10px] ml-auto'>
                {userInfo.description.length}/60
              </span>
            </>
          ) : (
            <p className='break-all text-sm '>
              {userInfo.description || (
                <span className='text-[#9CA3AF] text-sm '>Bio</span>
              )}
            </p>
          )}
        </div>

        {/* LOCATION */}
        <div className='flex gap-1 text-sm items-center'>
          <MdLocationPin size={15} />
          {isEditing ? (
            <input
              placeholder='Localiza????o'
              type='text'
              className='w-full text-sm  focus:outline-none bg-lightWhite dark:bg-transparent'
              disabled={!isEditing || isLoading}
              name='location'
              value={userInfo.location ?? ''}
              onChange={handleChange}
              maxLength={30}
            />
          ) : (
            <p>{userInfo.location}</p>
          )}
        </div>
      </div>
    </header>
  );
};
export default UserProfileCard;
