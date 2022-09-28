const { AnimatePresence, motion } = require('framer-motion');

const ErrorMessage= ({ show, message, className }:{ show:boolean, message:string, className:string}): JSX.Element => {
  
  return (
    
      <div className="my-2 min-h-[20px]">
        <AnimatePresence>
          {show && (
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={className}
            >
              {message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    
  );
};
export default ErrorMessage;