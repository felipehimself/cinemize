const { motion } = require('framer-motion');

const NoPostsMsg = (): JSX.Element => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='flex justify-center items-center flex-col gap-1 pt-20'
    >
      Você ainda não criou posts
     
    </motion.div>
  );
};
export default NoPostsMsg;
