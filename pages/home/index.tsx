import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

import Head from 'next/head';
import PostCard from '../../Components/Elements/PostCard';
import PostForm from '../../Components/Elements/PostForm';
import PostButton from '../../Components/Elements/PostButton';

import { UserPost } from '../../ts/types/user';
import { Post as PostType , PostCard as PC} from './../../ts/types/post';

import { connect } from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;
import * as jose from 'jose';
import Post from '../../models/Post';
import User from './../../models/User';

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

  const postsIds = userResponse.posts.map((post: UserPost) => post.postId);

  const userPosts = await Post.aggregate([
    { $match: { postId: { $in: postsIds } } },
  ]);

  const postsComplete = userPosts.map(post => ({...post, userName: userResponse.userName, isVerified: userResponse?.isVerified}))

  // const userFollowingPosts = await Post.aggregate([
  //   { $match: { postId: { $in: postsIds } } },
  // ])

  const options = [
    'netflix',
    'amazon',
    'star+',
    'hbo max',
    'youtube',
    'disney+',
  ];
  const genre = ['triller', 'action', 'comedy'];

  return {
    props: {
      options,
      genre,
      posts: JSON.parse(JSON.stringify(postsComplete)),
    },
  };
};
