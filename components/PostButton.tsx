import { IoAdd } from 'react-icons/io5';
import { toggleForm } from '../features/formSlice';
import { useAppDispatch } from '../store/store';

const PostButton = (): JSX.Element => {

  const dispatch = useAppDispatch()

  const toggleShowForm = () => {
    dispatch(toggleForm(true))
  }

  return (
    <button
      onClick={toggleShowForm}
      className='group sm:hidden rounded-full bg-indigo-600  p-3 fixed bottom-14 right-6 '
    >
      <IoAdd size={22} color='white' className='group-hover:rotate-90 transition' />
    </button>
  );
};
export default PostButton;
