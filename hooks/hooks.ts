import React, { useState } from 'react';
import Router from 'next/router';

import { toggleForm } from '../features/formSlice';
import { useAppDispatch } from '../store/store';
import { useRouter } from 'next/router';
export const useShowForm = (isShow: boolean) => {};

export const useLoading = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return isLoading
};
