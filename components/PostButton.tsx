import { Dispatch, SetStateAction } from 'react';
import { IoAdd } from 'react-icons/io5';


type Props = {
  setShowForm: Dispatch<SetStateAction<boolean>>
}

const PostButton = ({ setShowForm,}: Props): JSX.Element => {
  return (
    <button
      onClick={() => setShowForm(true)}
      className='sm:hidden rounded-full bg-indigo-600  p-3 fixed bottom-14 right-6 hover:rotate-90 transition'
    >
      <IoAdd size={22} color='white' />
    </button>
  );
};
export default PostButton;
