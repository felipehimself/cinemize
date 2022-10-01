import { Dispatch, SetStateAction } from 'react';
import { IoAdd } from 'react-icons/io5';

const PostButton = ({
  setShowForm,
}: {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  return (
    <button
      onClick={() => setShowForm(true)}
      className='sm:hidden rounded-full bg-indigo-600 dark:bg-darker p-3 fixed bottom-14 right-6 hover:rotate-90 transition'
    >
      <IoAdd size={22} color='white' />
    </button>
  );
};
export default PostButton;
