import React from 'react';

const { motion } = require('framer-motion');

type Props = {
  message: string;
};

const NoDataMsg = ({ message }: Props): JSX.Element => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='flex justify-center items-center flex-col gap-1 pt-20'
    >
      {message}
    </motion.div>
  );
};
export default NoDataMsg;
