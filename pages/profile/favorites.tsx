import { GetServerSideProps, NextPage } from "next"
import {connect} from 'mongoose'
import { getUserId } from "../../utils/dbFunctions";
import User from "../../models/User";
import Post from "../../models/Post";
import PostCard from "../../components/PostCard";
const MONGODB_URI = process.env.MONGODB_URI || '';
import { Post as AllPosts } from "../../ts/types/post";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Favorites:NextPage<{favoritedPosts:AllPosts[], loggedUserId:string}> = ({favoritedPosts, loggedUserId}) => {

  const { posts } = useSelector((state:RootState)=>state.posts)
  console.log(loggedUserId);
  
  const res = posts.filter(post => {

    return post.favoritedBy.find((fav)=> fav.userId === loggedUserId)

  })
  console.log(res)

  
  return (
    <div>
     {favoritedPosts.map((post)=>{
      return <PostCard loggedUserId={loggedUserId} key={post.postId} {...post} />
     })}
    
    </div>
  )
}
export default Favorites

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const jwt = ctx.req.cookies.CinemizeJWT;

  const _id = await getUserId(jwt);

  const userId = await User.findOne({_id})
  
  const followingPosts = await Post.aggregate([
    {$match: {favoritedBy: {$elemMatch: {userId: userId?.userId}}} },
 { $lookup:
        {
          from: 'users',
          localField: 'userId',
          foreignField: 'userId',
          as: 'user'
        }
   },
   { $unwind: '$user' },
   { $replaceRoot: { newRoot: { $mergeObjects: [ "$user" , "$$ROOT" ] } } },
   {$project: {user: 0, password: 0, email:0, name:0,description:0, location:0}}
  ])

  console.log(followingPosts)
  
  
  return {
    props: {
      favoritedPosts:JSON.parse(JSON.stringify(followingPosts)),
      loggedUserId:userId?.userId
  }
}
};
