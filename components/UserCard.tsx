import { Dispatch, SetStateAction, useState } from 'react';
import { MdLocationPin, MdVerified } from 'react-icons/md';
import { UserProfile } from '../ts/types/user';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  user: UserProfile;
  loggedUser: UserProfile;
  followers: UserProfile[];
  following: UserProfile[];
};

const UserCard = ({ user, followers, loggedUser }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter()
  const refreshProps = () => router.replace(router.asPath);


  const handleFollow = async () => {
    setIsLoading(true);

    try {
     await axios.post('/api/follow', {userId: user.userId})
      refreshProps()
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  };

  const handleUnFollow = async () => {
    setIsLoading(true);

    try {
    await axios.put('/api/follow', { userId: user.userId })
     refreshProps()
     setIsLoading(false)

    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  };



  return (
    <header className='flex-1 flex flex-col gap-4 pt-6'>
      <div className='relative flex flex-col gap-2 border p-3 rounded bg-lightWhite dark:bg-lightDark'>
        <span className='font-bold flex items-center gap-1 text-sm absolute left-2 -top-3 bg-light-pattern dark:bg-dark px-1 dark:bg-dark-pattern '>
          @{user.userName.slice(0, user.name.length + 6)}
          {user.isVerified && <MdVerified className='-mb-[1px]' />}
        </span>

        <div className='flex items-center justify-between mt-2'>
          <p className='text-sm  focus:outline-none bg-lightWhite dark:bg-lightDark'>
            {user.name}
          </p>
        </div>
        <div className='flex gap-1'>
          <p className='break-all text-sm '>
            {user.description || (
              <span className='text-[#9CA3AF] text-sm '>
                Bio
              </span>
            )}
          </p>
        </div>

        <div className='flex gap-1  items-center'>
          <MdLocationPin size={15} />
          <p className='w-full text-sm  focus:outline-none bg-lightWhite dark:bg-transparent'>
            {user.location}
          </p>
        </div>
        <div>

          {followers.some((user) => user.userId === loggedUser.userId) ? (
            <button
              onClick={handleUnFollow}
              disabled={isLoading}
              className='bg-indigo-600 px-2 py-1 text-white rounded-md text-xs'
            >
              Seguindo
            </button>
          ) : (
            <button
              onClick={handleFollow}
              disabled={isLoading}
              className='bg-indigo-600 px-2 py-1 text-white rounded-md text-xs'
            >
              Seguir
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default UserCard;
