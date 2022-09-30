import Button from '../UI/Button';
import Form from '../UI/Form';
import FormControl from '../UI/FormControl';
import Label from '../UI/Label';
import OptionsContainer from './OptionsContainer';
import { Post } from '../../ts/types/post';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postValidation } from '../../lib/yup';
import { IoArrowBack } from 'react-icons/io5';
import { overlayVariants, formVariants } from '../../lib/framer';
import { Dispatch, SetStateAction } from 'react';

const { motion } = require('framer-motion');

const PostForm = ({ options, genre, setShowForm,}: {
  options: string[];
  genre: string[];
  setShowForm: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Post>({
    resolver: yupResolver(postValidation),
  });

  const onSubmit = (data: Post) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <motion.div
      variants={overlayVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='fixed z-30 top-0 left-0 bg-[rgba(0,0,0,0.2)] w-full h-full backdrop-blur-[2px]'
      onClick={()=>setShowForm(false)}
    >
      <motion.div
        variants={formVariants}
        className='md:w-6/12 xl:w-5/12 h-full p-6   bg-white dark:bg-dark'
        onClick={(e:any)=>e.stopPropagation()}
      >
        <button
          onClick={() => setShowForm(false)}
          className='mb-1 block ml-auto transition hover:scale-105'
        >
          <IoArrowBack size={22} />
        </button>

        <Form onSubmit={handleSubmit(onSubmit)} className='w-full gap-4'>
          <FormControl>
            <Label htmlFor='title' className='mb-2'>
              Título
            </Label>
            <input
              className='-mt-1  w-full dark:border-dark focus:outline-none focus:border-indigo-600 p-2   border rounded-md'
              type='text'
              id='title'
              {...register('title')}
            />
          </FormControl>
          <FormControl>
            <div className='flex gap-4'>
              <div className='flex items-center gap-2'>
                <input
                  className='-mt-1 accent-indigo-500'
                  type='radio'
                  id='movie'
                  value='movie'
                  {...register('type')}
                />
                <Label htmlFor='movie'>Filme</Label>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  className='-mt-1 accent-indigo-500'
                  type='radio'
                  id='serie'
                  value='series'
                  {...register('type')}
                />
                <Label htmlFor='serie'>Série</Label>
              </div>
            </div>
          </FormControl>
          <FormControl>
            <textarea
              id='description'
              placeholder='Escreva aqui...'
              className='h-32 dark:border-dark focus:outline-none focus:border-indigo-600 p-2  w-full border rounded-md resize-none'
              {...register('description')}
            />
          </FormControl>
          <FormControl>
            <Label htmlFor='' className='mb-1'>
              Onde assistir?
            </Label>
            <OptionsContainer>
              {options.map((option) => {
                return (
                  <Label
                    key={option}
                    className='flex gap-2 mr-2 capitalize'
                    htmlFor={option}
                  >
                    <input
                      {...register('whereToWatch')}
                      className='accent-indigo-500'
                      value={option}
                      type='checkbox'
                      name='whereToWatch'
                      id={option}
                    />
                    {option}
                  </Label>
                );
              })}
            </OptionsContainer>
          </FormControl>
          <FormControl>
            <Label htmlFor='' className='mb-1'>
              Gênero
            </Label>
            <OptionsContainer>
              {genre.map((gen) => {
                return (
                  <Label
                    key={gen}
                    className='flex gap-2 mr-2 capitalize'
                    htmlFor={gen}
                  >
                    <input
                      {...register('genre')}
                      className='accent-indigo-500'
                      value={gen}
                      type='checkbox'
                      name='genre'
                      id={gen}
                    />
                    {gen}
                  </Label>
                );
              })}
            </OptionsContainer>
          </FormControl>
          <Button type='submit' className='p-2 rounded-md mt-2'>
            Enviar
          </Button>
        </Form>
      </motion.div>
    </motion.div>
  );
};
export default PostForm;
