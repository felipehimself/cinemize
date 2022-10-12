import { GetServerSideProps, NextPage } from 'next';
import Post from '../../../models/Post';
import { connect } from 'mongoose';
import PostCard from '../../../components/PostCard';
import { Post as PC } from '../../../ts/types/post';
import { getUserId } from '../../../utils/dbFunctions';
import User from '../../../models/User';
import Head from 'next/head';
import Notification from '../../../models/Notification';

const MONGODB_URI = process.env.MONGODB_URI || '';

const PostId: NextPage<{ post: PC; loggedUserId: string }> = ({
  post,
  loggedUserId,
}) => {
  return (
    <>
      <Head>
        <title>cine.mize - post</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mt-2 flex flex-col gap-2'>
        <div className='inline-block self-start text-sm py-1 px-3 rounded-md  bg-lightWhite border dark:bg-lightDark'>
          <h2>Postagem</h2>
        </div>
        <PostCard loggedUserId={loggedUserId} {...post} />
      </main>
    </>
  );
};
export default PostId;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const postId = ctx?.query?.postId;
  const notificationId = ctx?.query?.q;
  
  const jwt = ctx.req.cookies.CinemizeJWT;
  const _id = await getUserId(jwt, ctx.req.url);
  const loggedUser = await User.findById(_id);

  const post = await Post.aggregate([
    { $match: { postId: postId } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: 'userId',
        as: 'userData',
      },
    },
    { $unwind: '$userData' },
    {
      $addFields: {
        userName: '$userData.userName',
        isVerified: '$userData.isVerified',
      },
    },
    { $project: { userData: 0 } },
  ]);

  const postRes = JSON.parse(JSON.stringify(post));

  if (postRes.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  await Notification.updateOne(
    {
      userId: loggedUser?.userId,
      'notifications.notificationId': notificationId,
    },
    { $set: { 'notifications.$.isRead': true } }
  );

  return {
    props: {
      post: postRes[0],
      loggedUserId: loggedUser?.userId,
    },
  };
};
