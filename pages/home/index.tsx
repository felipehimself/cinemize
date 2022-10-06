import { GetServerSideProps, NextPage } from 'next';

import Head from 'next/head';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import PostButton from '../../components/PostButton';
import NoDataMsg from '../../components/NoDataMsg';

import { RootState, useAppDispatch } from '../../store/store';
import { toggleForm } from '../../features/formSlice';
import { useSelector } from 'react-redux';

import { Post as AllPosts } from './../../ts/types/post';

import { getAllPosts, getUserId } from '../../utils/dbFunctions';

import { connect } from 'mongoose';
import User from '../../models/User';
const MONGODB_URI = process.env.MONGODB_URI || '';

const { AnimatePresence } = require('framer-motion');

const Home: NextPage<{
  options: string[];
  genre: string[];
  posts: AllPosts[];
  loggedUserId: string;
}> = ({ options, genre, posts, loggedUserId }) => {

  const dispatch = useAppDispatch();

  const { showForm } = useSelector((state: RootState) => state.showForm);

  const toggleShowForm = () => {
    dispatch(toggleForm(true))
  }


  return (
    <>
      <Head>
        <title>cine.mize - home</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AnimatePresence>
        {showForm && (
          <PostForm options={options} genre={genre} />
        )}
      </AnimatePresence>

      <div className='hidden container left-1/2 -translate-x-2/4  sm:flex fixed mt-2  justify-end'>
        <button
          onClick={toggleShowForm}
          className='block transition hover:bg-indigo-800  bg-indigo-600  py-1 px-3 rounded-md text-white'
        >
          Postar
        </button>
      </div>

      {posts.length === 0 && <NoDataMsg message='Você ainda não criou posts' />}
      <section className='sm:pt-10'>
        {/* TIMELINE */}
        <div className='flex-1 flex flex-col gap-4 pt-2 sm:pt-3'>
          {posts.map((post) => {
            return (
              <PostCard
                loggedUserId={loggedUserId}
                key={post.postId}
                {...post}
              />
            );
          })}
        </div>
      </section>
      <PostButton  />
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const jwt = ctx.req.cookies.CinemizeJWT;
  const _id: string = await getUserId(jwt);

  const loggedUser = await User.findById(_id);

  const allPosts = await getAllPosts(_id!);

  const options = [
    'netflix',
    'amazon',
    'star+',
    'hbo max',
    'youtube',
    'disney+',
  ];
  const genre = [
    'suspense',
    'terror',
    'horror',
    'ação',
    'comédia',
    'drama',
    'guerra',
  ];

  return {
    props: {
      options,
      genre,
      posts: allPosts,
      loggedUserId: JSON.parse(JSON.stringify(loggedUser?.userId)),
    },
  };
};
