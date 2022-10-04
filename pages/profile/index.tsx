import { useState, useEffect } from 'react';
import { tabs } from '../../utils/constants';

import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { UserProfile } from '../../ts/types/user';

import UserProfileContainer from '../../components/UserProfileContainer';
import UserProfileCard from '../../components/UserProfileCard';
import TabButtons from '../../components/TabButtons';
import TabContent from '../../components/TabContent';
import UserFollowerCard from '../../components/UserFollowerCard';
import PostCard from '../../components/PostCard';
import NoPostsMsg from '../../components/NoPostsMsg';
import NoFollowMessage from '../../components/NoFollowMessage';
import PostForm from '../../components/PostForm';
import { useAppDispatch } from '../../store/store';
import { saveProfilePosts } from '../../features/profilePostsSlice';
import User from '../../models/User';
import { connect } from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || '';

import { getUserId, getUserFollow, getAllPosts } from '../../utils/dbFunctions';

import { PostCard as PC } from '../../ts/types/post';
import PostButton from '../../components/PostButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Profile: NextPage<{ user: UserProfile; followers: UserProfile[]; following: UserProfile[]; posts:PC[]; loggedUserId:string, genre:string[], options:string[] }> = ({ user, followers, following, posts, loggedUserId,options,genre }) => {
  
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useAppDispatch()

  const { showForm } = useSelector((state:RootState)=> state.showForm)
  const { profilePosts } = useSelector((state:RootState)=> state.profilePosts)

  useEffect(()=> {
    const userProfilePosts = posts.filter(post =>post.userId === loggedUserId)
    dispatch(saveProfilePosts(userProfilePosts))
  },[posts, loggedUserId, dispatch])


  return (
    <>
      <Head>
        <title>cine.mize - profile</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section>
        <UserProfileContainer>
          <UserProfileCard user={user} />
          <TabButtons
            followersQty={followers.length}
            followingQty={following.length}
            setTabIndex={setTabIndex}
            index={tabIndex}
            isPostAllowed
          />
        </UserProfileContainer>

          <TabContent tab='posts' activeTab={tabs[tabIndex]}>
          {profilePosts.filter(post =>post.userId === loggedUserId).length === 0 && <NoPostsMsg />}

            {profilePosts.filter(post =>post.userId === loggedUserId).map((post) => {
              return <PostCard loggedUserId={loggedUserId} key={post.postId} {...post} />;
            })}
          </TabContent>
          <TabContent tab='followers' activeTab={tabs[tabIndex]}>
          {followers.length === 0 && <NoFollowMessage message='Você ainda não possui seguidores' />}

            {followers.map((user) => {
              return <UserFollowerCard key={user.userId} {...user} />;
            })}
          </TabContent>
          <TabContent tab='following' activeTab={tabs[tabIndex]}>
          {following.length === 0 && <NoFollowMessage message='Você ainda está seguindo ninguém' />}

            {following.map((user) => {
              return <UserFollowerCard key={user.userId} {...user} />;
            })}
          </TabContent>

          <PostButton  />
          {showForm &&  <PostForm options={options} genre={genre} />}
      </section>
    </>
  );
};
export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const jwt = ctx.req.cookies.CinemizeJWT;

  const _id = await getUserId(jwt);
  
  const user = await User.findOne({_id}, { password: 0, createdAt: 0, _id: 0, email: 0, updatedAt: 0 });
  
  const userResponse = await JSON.parse(JSON.stringify(user));

  // const loggedUserPosts = await getUserPosts(userResponse?.userId!)
  const posts = await getAllPosts(_id!)

  const { followers, following } = await getUserFollow(userResponse?.userId)

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
      user: userResponse,
      followers: followers,
      following: following,
      posts: posts,
      loggedUserId: userResponse?.userId,
      options:options,
      genre:genre
    },
  };
};
