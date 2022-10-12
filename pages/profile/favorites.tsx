import { GetServerSideProps, NextPage } from 'next';
import { connect } from 'mongoose';
import { getUserId } from '../../utils/dbFunctions';
import User from '../../models/User';
import Post from '../../models/Post';
import PostCard from '../../components/PostCard';
import { Post as AllPosts } from '../../ts/types/post';
import NoDataMsg from '../../components/NoDataMsg';
import Head from 'next/head';
const MONGODB_URI = process.env.MONGODB_URI || '';

const Favorites: NextPage<{
  favoritedPosts: AllPosts[];
  loggedUserId: string;
}> = ({ favoritedPosts, loggedUserId }) => {
  return (
    <>
      <Head>
        <title>cine.mize - favoritos</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='fixed top-16 -mt-1 z-30 container left-1/2 -translate-x-2/4'>
        <div className='bg-white dark:bg-dark mt-2 '>
          <div className='inline-block text-sm py-1 px-3 rounded-md  bg-lightWhite border dark:bg-lightDark'>
            <h2>Favoritos</h2>
          </div>
        </div>
      </div>
      <main className='mt-1 pt-10 flex flex-col gap-4'>
        {favoritedPosts.length === 0 && (
          <NoDataMsg message='Você ainda não adicionou favoritos' />
        )}

        {favoritedPosts.map((post) => {
          return (
            <PostCard loggedUserId={loggedUserId} key={post.postId} {...post} />
          );
        })}
      </main>
    </>
  );
};
export default Favorites;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const jwt = ctx.req.cookies.CinemizeJWT;

  const _id = await getUserId(jwt, ctx.req.url);

  const userId = await User.findOne({ _id });

  const followingPosts = await Post.aggregate([
    { $match: { favoritedBy: { $elemMatch: { userId: userId?.userId } } } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: 'userId',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    { $replaceRoot: { newRoot: { $mergeObjects: ['$user', '$$ROOT'] } } },
    {
      $project: {
        user: 0,
        password: 0,
        email: 0,
        name: 0,
        description: 0,
        location: 0,
      },
    },
  ]);

  return {
    props: {
      favoritedPosts: JSON.parse(JSON.stringify(followingPosts)),
      loggedUserId: userId?.userId,
    },
  };
};
