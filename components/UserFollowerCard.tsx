import Link from 'next/link';
import { UserProfile } from '../ts/types/user';
import { MdVerified , MdLocationPin} from 'react-icons/md';

const UserFollowerCard = ({ name, userName, description, location, isVerified }: Omit<UserProfile, 'followers' | 'following'>): JSX.Element => {
  return (
    <div className='text-sm border rounded-md p-2 flex flex-col gap-1 dark:bg-lightDark'>
      <Link href={`/user/${userName}`}>
        <a className='text-sm font-bold flex items-center gap-1'>
          @{userName} {isVerified && <MdVerified className='fill-indigo-600 dark:fill-white' />}
        </a>
      </Link>
      <div className='mt-2'>
        <p >{name}</p>
      </div>
      <div>
        <p >{description}</p>
      </div>
      {/* <div className='flex gap-1 items-center'>
       <MdLocationPin /> <p >{location}</p>
      </div> */}
    </div>
  );
};
export default UserFollowerCard;
