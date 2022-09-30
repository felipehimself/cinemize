import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Form from '../../Components/UI/Form';
import ColorMode from '../../Components/ColorMode/ColorMode';
import Button from '../../Components/UI/Button';
import IsLoading from '../../Components/UI/IsLoading';
import Fieldset from '../../Components/UI/Fieldset';
import ErrorMessage from '../../Components/Elements/ErrorMessage';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidation } from '../../lib/yup';
import { Login as LoginType } from '../../ts/types/login';

import axios from 'axios';


const Login: NextPage = () => {
  const [error, setError] = useState({ message: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);

  // adicionar trim no loginValidation
  // COLOCAR TRATAMENTO PARA REDIRECIONAR PARA PROFILE CASO USUÁRIO TENTE VER SEU PRÓPRIO PERFIL
  // TRATAR CAMPOS DE LOGIN, SIGNUP, TIPOS, TRIM ETC
  // TRATAR UPDATE BIO, QTD CARACTERE E ETC, TRIM ETC
  // PROTEGER ROTAS SÓ PARA LOGADO
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginType>({
    resolver: yupResolver(loginValidation),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginType) => {
    const { email, password } = data;


    setIsLoading(true);
    setError({ message: '', isError: false });
    clearErrors();

    try {
      await axios.post('/api/auth/login', { email, password });
      router.reload();
    } catch (error: any) {
      setIsLoading(false);
      setError({ message: error.response.data.message, isError: true });
    }
  };

  return (
    <>
      <Head>
        <title>cine.mize</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col h-screen justify-center sm:flex-row sm:items-center sm:justify-end sm:gap-12 '>
        <h1 className='text-3xl text-center mb-12 sm:mb-0 sm:text-6xl sm:-mt-12 '>
          c<span className='text-indigo-600 dark:text-indigo-400'>i</span>ne
          <span className='text-indigo-600 dark:text-indigo-400'>.</span>mi
          <span className='text-indigo-600 dark:text-indigo-400'>z</span>e
        </h1>
        <div className='sm:w-6/12 md:w-80'>
          <h2 className='text-2xl text-center'>login</h2>

          <ErrorMessage
            className='text-sm block text-center '
            show={error.isError}
            message={error.message}
          />

          <Form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <Fieldset disabled={isLoading} className='flex flex-col gap-1'>
              <div>
                <input
                  type='text'
                  className='rounded-md w-full dark:border-dark py-2 px-2 dark:focus:outline-none focus:outline-none border focus:border-indigo-600 border-gray-300'
                  placeholder='E-mail'
                  id='email'
                  aria-label='Seu email'
                  {...register('email')}
                />
                <small className='text-red-600 dark:text-slate-200 text-xs block min-h-[20px] pl-1'>
                  {errors.email?.message}
                </small>
              </div>
              <div>
                <input
                  type='password'
                  className='rounded-md w-full dark:border-dark py-2 px-2 dark:focus:outline-none focus:outline-none border focus:border-indigo-600 border-gray-300'
                  placeholder='Senha'
                  id='password'
                  {...register('password')}
                  aria-label='Sua senha'
                />
                <small className='text-red-600 dark:text-slate-200 text-xs block min-h-[20px] pl-1'>
                  {errors.password?.message}
                </small>
              </div>
              <Button
                type='submit'
                className='flex items-center justify-center min-h-[40px] bg-indigo-600 py-2 rounded-md'
              >
                {isLoading ? <IsLoading /> : 'Entrar'}
              </Button>
            </Fieldset>
          </Form>
          <div className='flex items-center justify-center gap-2 text-md'>
            <h3 className='text-center my-4 text-base '>Não tem uma conta?</h3>
            <Link href='/'>
              <a className='block text-center text-md hover:text-gray-900 dark:hover:text-indigo-300 transition underline'>
                Inscreva-se
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className='fixed top-8 right-8 flex mt-auto mb-10 justify-left'>
        <ColorMode size={22} />
      </div>
    </>
  );
};
export default Login;
