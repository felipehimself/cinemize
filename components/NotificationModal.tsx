import { overlayVariants, formVariants } from '../lib/framer';
import { toggleNotification } from '../features/notificationSlice';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch } from '../store/store';
import { Notification } from '../ts/types/notification';
import { useRouter } from 'next/router';

const { motion } = require('framer-motion');

const NotificationModal = ({
  userNotifications,
}: {
  userNotifications?: Notification | null;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter()

  const handleHideNotification = () => dispatch(toggleNotification(false));

  const handleRedirect = (path: string) => {
    router.push(path);
    dispatch(toggleNotification(false));
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='fixed text-sm z-50 inset-0 flex justify-center bg-[rgba(0,0,0,0.2)] w-full h-screen backdrop-blur-[2px] '
    >
      <motion.div
        variants={formVariants}
        className='w-full h-screen overflow-y-scroll p-6 bg-white dark:bg-dark'
        onClick={(e: Event) => e.stopPropagation()}
      >
        <div className='flex justify-end mb-2'>
          <button onClick={handleHideNotification}>
            <IoClose
              size={22}
              className='group-hover:text-indigo-600 group-hover:rotate-90  group-hover:scale-110 dark:group-hover:text-white transition'
            />
          </button>
        </div>
        {(userNotifications?.notifications.length == 0 ||
          !userNotifications?.notifications)  &&  <p className='text-center'>Sem notificações</p>
        }

        <ul className='flex  flex-col gap-2  top-8 right-0 text-sm'>
          {(userNotifications?.notifications.length !== 0 ||
          !userNotifications?.notifications)  && 
            userNotifications?.notifications?.map((notification) => {
              return (
                <li
                  className='cursor-pointer p-3  rounded-md dark:bg-darker bg-slate-100'
                  onClick={() => handleRedirect(notification.redirect)}
                  key={notification._id}
                >
                  <span className='font-bold'>{notification.userName}</span> {notification.message}
                </li>
              );
            })
          }
         
        </ul>
      </motion.div>
    </motion.div>
  );
};
export default NotificationModal;
