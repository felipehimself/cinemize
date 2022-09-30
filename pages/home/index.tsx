import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

import Head from 'next/head';
import PostCard from '../../Components/Elements/PostCard';
import PostForm from '../../Components/Elements/PostForm';
import PostButton from '../../Components/Elements/PostButton';

const { AnimatePresence } = require('framer-motion');

const Home: NextPage<{ options: string[]; genre: string[]; posts: any }> = ({
  options,
  genre,
  posts,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Head>
        <title>cine.mize - home</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AnimatePresence>
        {showForm && (
          <PostForm
            setShowForm={setShowForm}
            options={options}
            genre={genre}
          />
        )}
      </AnimatePresence>

      <section className=''>
        {/* TIMELINE */}

        <div className='flex-1 flex flex-col gap-4 pt-2'>
          <button
            onClick={() => setShowForm(true)}
            className='hidden sm:block ml-auto bg-indigo-600 dark:bg-darker py-1 px-3 rounded-md text-white'
          >
            Post
          </button>
          {posts.map((post: any) => {
            return <PostCard key={post.id} {...post} />;
          })}
        </div>
      </section>
      <PostButton setShowForm={setShowForm} />
    </>
  );
};
export default Home;

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

  // await connect(MONGODB_URI).catch(err => console.log(err))

  const posts = [
    {
      id: '1',
      verified: true,
      user: 'cinemize',
      title: 'O segredo dos seus olhos',
      genres: ['triller', 'action'],
      comment: 'this is an amazing movie',
      whereToWatch: ['netflix', 'amazon'],
      type: 'movie',
      likes: {
        total: 5,
        likedBy: [],
      },
    },
    {
      id: '2',
      verified: true,
      user: 'cinemize',
      title: 'O segredo dos seus olhos',
      genres: ['triller', 'action'],
      comment: 'this is an amazing movie',
      whereToWatch: ['netflix', 'amazon'],
      type: 'movie',
      likes: {
        total: 5,
        likedBy: [],
      },
    },
    {
      id: '3',
      verified: false,
      user: 'cinemize',
      title: 'O segredo dos seus olhos',
      genres: ['triller', 'action'],
      comment: 'this is an amazing movie',
      whereToWatch: ['netflix', 'amazon'],
      type: 'movie',
      likes: {
        total: 5,
        likedBy: [],
      },
    },
  ];

  return {
    props: {
      options,
      genre,
      posts,
    },
  };
};
