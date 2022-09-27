import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { MdLocationPin, MdVerified } from 'react-icons/md';
import { UserProfile } from '../../ts/types/user';
import User from '../../models/User';
import { useRouter } from 'next/router';
import { connect } from 'mongoose';
import * as jose from 'jose';

import axios from 'axios';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

type CurrentUser = { name: string; userName: string; isVerified: boolean };

const UserId = ({ user, currentUser,}: { user: UserProfile & { isFollowing: boolean };  currentUser: CurrentUser}): JSX.Element => {
  const [userInfo, setUserInfo] = useState(user);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async (type:string) => {
    setIsLoading(true);

    try {
      await axios.patch('/api/user/user', {
        userName: user.userName,
        name: user.name,
        isVerified: user.isVerified,
        type: type,
      });
      if(type === 'follow'){
        setUserInfo(prev => ({...prev, followers: [...prev.followers, currentUser]}))
      } else if(type === 'unfollow'){
        setUserInfo(prev => ({...prev, followers: prev.followers.filter(user => user.userName !== currentUser.userName)}))
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <header className='   flex-1 flex flex-col gap-4 pt-6'>
      <div className='relative flex flex-col gap-2 border p-3 rounded bg-lightWhite dark:bg-lightDark'>
        <span className='font-bold flex items-center gap-1 text-sm absolute left-2 -top-3 bg-light-pattern dark:bg-dark px-1 dark:bg-dark-pattern '>
          @{userInfo.userName.slice(0, userInfo.name.length + 6)}
          {userInfo.isVerified && <MdVerified />}
        </span>

        <div className='flex items-center justify-between'>
          <p className='text-sm md:text-base focus:outline-none bg-lightWhite dark:bg-lightDark'>
            {userInfo.name}
          </p>
        </div>
        <div className='flex gap-1'>
          <p className='break-all text-sm md:text-base'>
            {userInfo.description || (
              <span className='text-[#9CA3AF] text-sm md:text-base'>
                Descrição
              </span>
            )}
          </p>
        </div>

        <div className='flex gap-1  items-center'>
          <MdLocationPin size={15} />
          <p className='w-full text-sm md:text-base focus:outline-none bg-lightWhite dark:bg-transparent'>
            {userInfo.location}
          </p>
        </div>
        <div>
          {userInfo.followers.some(user => user.userName === currentUser.userName) ? (
            <button
              onClick={()=> handleFollow('unfollow')}
              disabled={isLoading}
              className='bg-indigo-600 px-2 py-1 rounded-md text-xs'
            >
              Seguindo
            </button>
          ) : (
            <button
              onClick={()=> handleFollow('follow')}
              disabled={isLoading}
              className='bg-indigo-600 px-2 py-1 rounded-md text-xs'
            >
              Seguir
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
export default UserId;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const userName = ctx?.params?.userName!;
  const userNameExists = await User.findOne({ userName });

  if (userNameExists === null) {
    ctx.res.writeHead(301, { Location: '/' });
    ctx.res.end();
  }

  const jwt = ctx.req.cookies.CinemizeJWT;

  const response = await jose.jwtVerify(
    jwt!,
    new TextEncoder().encode(JWT_SECRET)
  );

  const _id = await response.payload.userId;

  const currentUser = await User.findById(
    { _id },
    {
      password: 0,
      description: 0,
      location: 0,
      followers: 0,
      following: 0,
      createdAt: 0,
      _id: 0,
      email: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  
  const parsedCurrentUser = await JSON.parse(JSON.stringify(currentUser));
  
  // verifica se user logado possui o perfil em seu arr de seguidores
  const isFollowing = await User.find({ _id: _id, ['following.userName']: { $in: [userName] } })
  
  const user = await User.findOne(
    { userName },
    {
      password: 0,
      createdAt: 0,
      _id: 0,
      email: 0,
      updatedAt: 0,
      __v: 0,
    }
  );
  const userResponse = await JSON.parse(JSON.stringify(user));

  // userFollowers
  // await User.find({userName: ${in: [] }})
  // userFollowing

  return {
    props: {
      user: {
        ...userResponse,
        isFollowing: isFollowing.length > 0 ? true : false,
      },
      currentUser: parsedCurrentUser,
    },
  };
};
