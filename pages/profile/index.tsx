import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Header from '../../Components/Elements/Header';
import CreatePost from '../../Components/Elements/CreatePost';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as jose from 'jose';
import User from '../../models/User';
import { connect } from 'mongoose';
import { User as UserType } from '../../ts/types/user';

import { MdVerified, MdLocationPin, MdStickyNote2 } from 'react-icons/md';

const MONGODB_URI = process.env.MONGODB_URI || ""
const JWT_SECRET = process.env.JWT_SECRET;

const Profile: NextPage<{
  options: any;
  genre: any;
  user: Pick<
    UserType,
    'name' | 'userName' | 'description' | 'isVerified' | 'location'
  >;
}> = ({ options, genre, user }) => {
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

  const router = useRouter();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // limitar também para name, userName e location
    // colocar trim no username e name
    // colocar trim no form de cadastro
    if (name === 'description') {
      if (userInfo.description.length < 112) {
        setUserInfo((prev) => ({ ...prev, [name]: value }));
      } else {
        setUserInfo((prev) => ({ ...prev, [name]: value.slice(0, -1) }));
      }
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setUserExists(false);

    try {
      await axios.patch('/api/user', userInfo);
      setIsLoading(false);
      setIsEditing(false);
      setUserInfoBkp(userInfo);
    } catch (error: any) {
      const status = error?.request?.status;
      if (status === 302) {
        setUserExists(true);
      }
      // setError({ message: error.response.data.message, isError: true });
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUserInfo(userInfoBkp);
    setUserExists(false);
    setIsEditing(false);
  };

  // resize width no input
  useEffect(() => {
    if (inputRef && isEditing) {
      // @ts-ignore
      inputRef.current.style.width = inputRef.current.value.length + 'ch';
    }
  }, [isEditing, userInfo]);

  // resize height na textarea
  useEffect(() => {
    if (textAreaRef) {
      // @ts-ignore
      textAreaRef.current.style.height = '1px';
      // @ts-ignore
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [isEditing, userInfo]);

  return (
    <>
      <Head>
        <title>cine.mize</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <section className='flex gap-1 py-14'>
        <CreatePost options={options} genre={genre} />
        <section className='flex-1 flex flex-col gap-4 pt-8'>
          <div className='relative flex flex-col gap-2 border p-3 rounded bg-lightWhite dark:bg-lightDark'>
            {isEditing ? (
              <div className='font-bold text-sm flex items-center absolute left-2 -top-3 bg-light-pattern dark:bg-dark px-1 dark:bg-dark-pattern'>
                <span className='font-bold'>@</span>
                <input
                  name='userName'
                  value={userInfo.userName || ''}
                  className=' font-bold focus:outline-none  bg-light-pattern dark:bg-dark-pattern '
                  onChange={handleChange}
                  ref={inputRef}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <span className='font-bold flex items-center gap-1 text-sm absolute left-2 -top-3 bg-light-pattern dark:bg-dark px-1 dark:bg-dark-pattern '>
                @{userInfo.userName.slice(0, userInfo.name.length + 6)}
                {userInfo.isVerified && <MdVerified />}
              </span>
            )}
            <span className='text-xs -mt-1 -mb-2 text-red-400 min-h-[16px]'>
              {userExists && 'Nome de usuário já existe'}
            </span>

            <div className='flex items-center justify-between'>
              <input
                className='text-sm focus:outline-none '
                onChange={handleChange}
                value={userInfo.name ?? ''}
                disabled={!isEditing || isLoading}
                name='name'
              />
              {isEditing ? (
                <div className='flex gap-2'>
                  <button
                    onClick={handleCancel}
                    className='text-xs'
                    disabled={isLoading}
                  >
                    cancelar
                  </button>
                  <button
                    onClick={handleUpdate}
                    className='text-xs'
                    disabled={isLoading}
                  >
                    salvar
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className='text-xs'>
                  editar
                </button>
              )}
            </div>
            <div className={`flex gap-1 items-start } `}>
              <MdStickyNote2 size={14} />

              <div className='w-full flex flex-col '>
                <textarea
                  placeholder='Descrição'
                  className='-mt-1 w-full text-sm focus:outline-none bg-lightWhite dark:bg-transparent resize-none'
                  disabled={!isEditing || isLoading}
                  name='description'
                  value={userInfo.description ?? ''}
                  onChange={handleChange}
                  ref={textAreaRef}
                />
                {isEditing && (
                  <span className='text-[10px] ml-auto'>
                    {userInfo.description.length}/112
                  </span>
                )}
              </div>
            </div>

            <div className='flex gap-1 items-center'>
              <MdLocationPin size={14} />
              <input
                placeholder='Localização'
                type='text'
                className='w-full text-sm focus:outline-none bg-lightWhite dark:bg-transparent'
                disabled={!isEditing || isLoading}
                name='location'
                value={userInfo.location ?? ''}
                onChange={handleChange}
              />
            </div>
            {router.pathname !== '/profile' && (
              <div className='flex items-center justify-end'>
                <button className='flex text-sm transition hover:bg-indigo-800 bg-indigo-600 text-white px-3 py-1 rounded-lg'>
                  Seguir
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};
export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const options = [
    'netflix',
    'amazon',
    'star+',
    'hbo max',
    'youtube',
    'disney+',
  ];
  const genre = ['triller', 'action', 'comedy'];

  await connect(MONGODB_URI).catch(err => console.log(err))
  const jwt = ctx.req.cookies.CinemizeJWT;

  const response = await jose.jwtVerify(
    jwt!,
    new TextEncoder().encode(JWT_SECRET)
  );
  const _id = await response.payload.userId;
  const user = await User.findById(_id, {
    password: 0,
    createdAt: 0,
    _id: 0,
    email: 0,
    updatedAt: 0,
    __v: 0,
  });
  const userResponse = JSON.parse(JSON.stringify(user));

  // const posts = [
  //   {
  //     id: '1',
  //     verified: true,
  //     user: 'cinemize',
  //     title: 'O segredo dos seus olhos',
  //     genres: ['triller', 'action'],
  //     comment: 'this is an amazing movie',
  //     whereToWatch: ['netflix', 'amazon'],
  //     type: 'movie',
  //     likes: {
  //       total: 5,
  //       likedBy: [],
  //     },
  //   },
  //   {
  //     id: '2',
  //     verified: true,
  //     user: 'cinemize',
  //     title: 'O segredo dos seus olhos',
  //     genres: ['triller', 'action'],
  //     comment: 'this is an amazing movie',
  //     whereToWatch: ['netflix', 'amazon'],
  //     type: 'movie',
  //     likes: {
  //       total: 5,
  //       likedBy: [],
  //     },
  //   },
  //   {
  //     id: '3',
  //     verified: false,
  //     user: 'cinemize',
  //     title: 'O segredo dos seus olhos',
  //     genres: ['triller', 'action'],
  //     comment: 'this is an amazing movie',
  //     whereToWatch: ['netflix', 'amazon'],
  //     type: 'movie',
  //     likes: {
  //       total: 5,
  //       likedBy: [],
  //     },
  //   },
  // ];

  return {
    props: {
      options,
      genre,
      user: userResponse,
    },
  };
};
