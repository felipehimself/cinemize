import React from 'react';

const UserProfileContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className='bg-white dark:bg-dark sticky mx-auto  -mt-2 top-14 z-30'>
      {children}
    </div>
  );
};
export default UserProfileContainer;
