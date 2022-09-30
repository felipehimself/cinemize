export const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
   
    transition: {
      duration: 0.2,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
  },
};

export const formVariants = {
  hidden: {
    opacity: 0,
    y: '100vw',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
     
    },
  },
  exit: {
    opacity: 0,
    y: '100vw',
  },
};