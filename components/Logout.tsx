import { IoLogOut } from 'react-icons/io5';
import { Logout as LO } from '../ts/types/ui';
import axios from 'axios'
import { useRouter } from 'next/router';

const Logout = ({className, size}:LO): JSX.Element => {

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.post(
        '/api/auth/logout',
        { key: 'static_key' }
      );

      router.reload()

    } catch (error) {
      console.log(error)
    }


  }


  return (
    <button onClick={handleLogout}>
      <IoLogOut size={size} className={`${className}`} />
    </button>
  );
};
export default Logout;
