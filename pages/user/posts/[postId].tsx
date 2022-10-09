import { GetServerSideProps, NextPage } from 'next';
import Post from '../../../models/Post';
import { connect } from 'mongoose';
import PostCard from '../../../components/PostCard';
import { Post as PC } from '../../../ts/types/post';
import { getUserId } from '../../../utils/dbFunctions';
import User from '../../../models/User';

const MONGODB_URI = process.env.MONGODB_URI || '';

const PostId: NextPage<{ post: PC; loggedUserId: string }> = ({
  post,
  loggedUserId,
}) => {
  return (
    <div className='mt-2 flex flex-col gap-2'>
      <h3 className='font-medium'>Postagem</h3>
      <PostCard loggedUserId={loggedUserId} {...post} />
    </div>
  );
};
export default PostId;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const postId = ctx?.params?.postId;

  const jwt = ctx.req.cookies.CinemizeJWT;
  const _id: string = await getUserId(jwt);
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

  return {
    props: {
      post: postRes[0],
      loggedUserId: loggedUser?.userId,
    },
  };
};
