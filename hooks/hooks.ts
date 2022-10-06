import { useState } from 'react';
import { toggleForm } from '../features/formSlice';
import { useAppDispatch } from '../store/store';
import { useRouter } from 'next/router';
export const useShowForm = (isShow: boolean) => {};

export const useRefreshProps = () => {
  const router = useRouter();

  router.replace(router.asPath);
};
