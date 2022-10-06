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

const Favorites:NextPage<{loggedUserId:string}> = ({ loggedUserId}) => {

  const { posts } = useSelector((state:RootState)=>state.posts)
  
  
  const res = posts.filter(post => {

    return post.favoritedBy.find((fav)=> fav.userId === loggedUserId)

  })
  
  return (
    <main className="pt-4 flex flex-col gap-4">
     {res.map((post)=>{
      return <PostCard loggedUserId={loggedUserId} key={post.postId} {...post} />
     })}
    
    </main>
  )
}
export default Favorites

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const jwt = ctx.req.cookies.CinemizeJWT;

  const _id = await getUserId(jwt);

  const userId = await User.findOne({_id})
  
  return {
    props: {
    
      loggedUserId:userId?.userId
  }
}
};
