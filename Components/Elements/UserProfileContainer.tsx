import React from 'react';

const UserProfileContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className='bg-white dark:bg-dark sticky mx-auto  -mt-2 top-12 '>
      {children}
    </div>
  );
};
export default UserProfileContainer;
