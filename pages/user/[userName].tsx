import { useState } from 'react';
import { GetServerSideProps } from 'next';
import User from '../../models/User';

import { connect } from 'mongoose';
import { tabs } from '../../utils/constants';

import UserCard from '../../components/UserCard';
import UserProfileContainer from '../../components/UserProfileContainer';
import TabContent from '../../components/TabContent';
import UserFollowerCard from '../../components/UserFollowerCard';
import TabButtons from '../../components/TabButtons';
import PostCard from '../../components/PostCard';

import { getUserPosts, getUserId,  getUserFollow } from '../../utils/dbFunctions';

import { UserProfile } from '../../ts/types/user';
import { PostCard as PC} from './../../ts/types/post';
import NoDataMsg from '../../components/NoDataMsg';

const MONGODB_URI = process.env.MONGODB_URI || '';

const UserId = ({ user, followers, following, loggedUser, posts }: {
  user: UserProfile;
  loggedUser: UserProfile;
  followers: UserProfile[];
  following: UserProfile[];
  posts:PC[]
}): JSX.Element => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section>
      <UserProfileContainer>
        <UserCard
          user={user}
          followers={followers}
          following={following}
          loggedUser={loggedUser}          
        />
        <TabButtons
          followersQty={followers.length}
          followingQty={following.length}
          setTabIndex={setTabIndex}
          index={tabIndex}
        />
      </UserProfileContainer>
      <div>
        <TabContent tab='posts' activeTab={tabs[tabIndex]}>
        {posts.length ===0 && <NoDataMsg message='Este usuário ainda não publicou' />}

          {posts.filter(post =>post.userId === user.userId).map((post) => {
            return <PostCard loggedUserId={loggedUser.userId} key={post.postId} {...post} />;
          })}
        </TabContent>
        <TabContent tab='followers' activeTab={tabs[tabIndex]}>
          {followers.map((user) => {
            return <UserFollowerCard key={user.userName} {...user} />;
          })}
        </TabContent>
        <TabContent tab='following' activeTab={tabs[tabIndex]}>
          {following.map((user) => {
            return <UserFollowerCard key={user.userName} {...user} />;
          })}
        </TabContent>
      </div>
    </section>
  );
};
export default UserId;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await connect(MONGODB_URI).catch((err) => console.log(err));

  const userName = ctx?.params?.userName!;

  // INFO DO PERFIL VISITADO
  const userExists = await User.findOne(
    { userName },
    {
      password: 0,
      createdAt: 0,
      _id: 0,
      email: 0,
      updatedAt: 0,
    }
  );

  // SE USUÁRIO MUDAR URL REDIRECIONA PARA HOME
  if (userExists === null) {
    
    // ctx.res.writeHead(301, { Location: '/' });
    // ctx.res.end();
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{},
    };

  }
  //

  const userData = await JSON.parse(JSON.stringify(userExists));
  
  // USUÁRIO VISITANTE/LOGADO
  const jwt = ctx.req.cookies.CinemizeJWT;
  const _id: string = await getUserId(jwt);
  const loggedUser = await User.findById({ _id });
  //

  // Redireciona se usuario tentar acessar seu próprio perfil mudando a URL
  if (userName === loggedUser?.userName) {
    // ctx.res.writeHead(301, { Location: '/profile' });
    // ctx.res.end();
    return {
      redirect: {
        permanent: false,
        destination: "/profile",
      },
      props:{},
    };
    
  }
  //

  const userPosts = await getUserPosts(userExists?.userId!);

  const { followers, following } = await getUserFollow(userData?.userId)

 

  return {
    props: {
      user: userData,
      loggedUser: {
        userName: loggedUser?.userName,
        userId: loggedUser?.userId,
        name: loggedUser?.userName,
        location: loggedUser?.location,
        isVerified: loggedUser?.isVerified,
        description: loggedUser?.description,
      },
      followers: followers,
      following: following,
      posts: userPosts
    },
  };
};
