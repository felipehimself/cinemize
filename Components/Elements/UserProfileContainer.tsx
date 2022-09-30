import React from 'react';

const UserProfileContainer = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className='bg-white dark:bg-dark fixed container left-1/2 -translate-x-2/4'>
      {children}
    </div>
  );
};
export default UserProfileContainer;
