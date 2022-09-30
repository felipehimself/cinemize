import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { UserProfile } from '../../ts/types/user';
import User from '../../models/User';
import { connect } from 'mongoose';
import * as jose from 'jose';
import { tabs } from '../../utils/constants';
import UserCard from '../../Components/Elements/UserCard';
import UserProfileContainer from '../../Components/Elements/UserProfileContainer';
import TabContent from '../../Components/Elements/TabContent';
import UserFollowerCard from '../../Components/Elements/UserFollowerCard';
import TabButtons from '../../Components/Elements/TabButtons';

const MONGODB_URI = process.env.MONGODB_URI || '';
const JWT_SECRET = process.env.JWT_SECRET;

const UserId = ({
  user,
  followers,
  following,
  loggedUser,
}: {
  user: UserProfile;
  loggedUser: UserProfile;
  followers: UserProfile[];
  following: UserProfile[];
}): JSX.Element => {
  const [userInfo, setUserInfo] = useState(user);
  const [userFollowers, setUserFollowers] = useState(followers);
  const [userFollowing, setUserFollowing] = useState(following);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section>
      <UserProfileContainer>
        <UserCard
          user={userInfo}
          followers={userFollowers}
          following={userFollowing}
          loggedUser={loggedUser}
          setUserFollowers={setUserFollowers}
        />
        <TabButtons
          followersQty={userFollowers.length}
          followingQty={userFollowing.length}
          setTabIndex={setTabIndex}
          index={tabIndex}
        />
      </UserProfileContainer>
      <div>
        <TabContent tab='posts' activeTab={tabs[tabIndex]}>
          {Array.from(Array(200).keys()).map((item) => {
            return <p key={item}>{item}</p>;
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

  // INFO DO PERFIL DO USUÁRIO
  const userNameExists = await User.findOne(
    { userName },
    {
      password: 0,
      createdAt: 0,
      _id: 0,
      email: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  // SE USUÁRIO MUDAR URL REDIRECIONA PARA HOME
  if (userNameExists === null) {
    ctx.res.writeHead(301, { Location: '/' });
    ctx.res.end();
  }

  const userResponse = await JSON.parse(JSON.stringify(userNameExists));
  //

  // USUÁRIO VISITANTE
  const jwt = ctx.req.cookies.CinemizeJWT;
  
  const payloadId = await jose.jwtVerify(
    jwt!,
    new TextEncoder().encode(JWT_SECRET)
  );
  const _id = await payloadId.payload.userId;
  const loggedUser = await User.findById({ _id });
  //

  // Redireciona se usuario tentar acessar seu próprio perfil mudando a URL
  if(userName === loggedUser?.userName){
    ctx.res.writeHead(301, { Location: '/profile' });
    ctx.res.end();
  }
  // 

  // FOLLOWERS DO PERFIL VISITADO
  const followersIds = userResponse?.followers?.map((user:any) => user.userId)

  const followers = await User.aggregate([
    { $match: { userId: { $in: followersIds } } },
    {
      $project: {
        _id: 0,
        email: 0,
        password: 0,
        followers: 0,
        following: 0,
        _v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);
  //

  // FOLLOWING DO PERFIL VISITADO
  const followingIds = userResponse?.following?.map((user:any) => user.userId)
  const following = await User.aggregate([
    { $match: { userId: { $in: followingIds } } },
    {
      $project: {
        _id: 0,
        email: 0,
        password: 0,
        followers: 0,
        following: 0,
        _v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    },
  ]);

  return {
    props: {
      user: userResponse,
      loggedUser: {
        userName: loggedUser?.userName,
        userId: loggedUser?.userId,
        name: loggedUser?.userName,
        location: loggedUser?.location,
        isVerified: loggedUser?.isVerified,
        description: loggedUser?.description,
      },
      followers: JSON.parse(JSON.stringify(followers)),
      following: JSON.parse(JSON.stringify(following)),
    },
  };
};
