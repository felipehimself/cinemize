import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

import Head from 'next/head';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import PostButton from '../../components/PostButton';

import { PostCard as PC} from './../../ts/types/post';

import { getAllPosts, getUserId } from '../../utils/functions';

import { connect } from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || '';


const { AnimatePresence } = require('framer-motion');

const Home: NextPage<{
  options: string[];
  genre: string[];
  posts: PC[];
}> = ({ options, genre, posts }) => {
  const [showForm, setShowForm] = useState(false);
  const [allPosts, setAllPosts] = useState(posts);

  // COLOCAR DISABLED NO FORM
  // POPULAR /PROFILE COM O POSTS DO USUÁRIO
  // POPULAR TIMELINE TAMBEM COM POSTS DOS SEGUINDO
  // COLOCAR OPÇÃO DE EXCLUIR POST NO POSTCARD
  // COLOCAR HORA NO POSTCARD
  // REVER TIPOS E ORGANIZAR O CÓDIGO
  
  return (
    <>
      <Head>
        <title>cine.mize - home</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AnimatePresence>
        {showForm && (
          <PostForm setShowForm={setShowForm} setAllPosts={setAllPosts} options={options} genre={genre} />
        )}
      </AnimatePresence>

      <section>
        {/* TIMELINE */}

        <div className='flex-1 flex flex-col gap-4 pt-2 sm:pt-3'>
          <button
            onClick={() => setShowForm(true)}
            className='hidden sm:block ml-auto bg-indigo-600 dark:bg-darker py-1 px-3 rounded-md text-white'
          >
            Postar
          </button>
          {allPosts.map((post: any) => {
            return <PostCard key={post.postId} {...post} />;
          })}
        </div>
      </section>
      <PostButton setShowForm={setShowForm} />
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const jwt = ctx.req.cookies.CinemizeJWT;
  const _id:string = await getUserId(jwt)

  const allPosts = await getAllPosts(_id!)

  const options = [ 'netflix', 'amazon', 'star+', 'hbo max','youtube', 'disney+'];
  const genre = ['suspense', 'terror', 'horror' , 'ação', 'comédia','drama','guerra'];

  return {
    props: {
      options,
      genre,
      posts: allPosts,
    },
  };
};
