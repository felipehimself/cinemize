import { useState, useEffect, useCallback, useMemo  } from 'react';
import Button from './Button';
import Form from './Form';
import FormControl from './FormControl';
import Label from './Label';
import OptionsContainer from './OptionsContainer';
import { Post, PostCard } from '../ts/types/post';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postValidation } from '../lib/yup';
import { IoClose } from 'react-icons/io5';
import { overlayVariants, formVariants } from '../lib/framer';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';

//@ts-ignore
import ReactStars from 'react-rating-stars-component';

const { motion } = require('framer-motion');

const PostForm = ({ options, genre,setShowForm,setAllPosts}: { options: string[]; genre: string[]; setShowForm: Dispatch<SetStateAction<boolean>>;
  setAllPosts: Dispatch<SetStateAction<PostCard[]>>
}): JSX.Element => {

  const [rating, setRating] = useState(1);
  const [ratingError, setRatingError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    clearErrors,
  } = useForm<Post>({
    resolver: yupResolver(postValidation),
  });

  const onSubmit = async (data: Post) => { 
    clearErrors()

    if(!rating) {
      setRatingError(true);
      return
    }
    const body = { ...data, rating };

    try {
     const res =  await axios.post('/api/post', body)
     setAllPosts((prev:any) => [...prev, res.data])

      setShowForm(false)
    } catch (error) {
      console.log(error)
    }
  };

  const ratingChanged = (newRating: number) => {
    setRating(newRating);
  };

  useEffect(()=>{
    if(formState.isSubmitting && !rating){
      setRatingError(true);

    }
  },[formState, rating])

  

  return (
    <motion.div
      variants={overlayVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='fixed text-sm z-30 inset-0 flex justify-center bg-[rgba(0,0,0,0.2)] w-full h-full backdrop-blur-[2px]'
      onClick={() => setShowForm(false)}
    >
      <motion.div
        variants={formVariants}
        className='md:w-6/12 xl:w-5/12 h-full p-6   bg-white dark:bg-dark'
        onClick={(e: Event) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowForm(false)}
          className='group mb-1 block ml-auto transition hover:rotate-90 hover:scale-110'
        >
          <IoClose size={22} className='group-hover:text-indigo-600 dark:group-hover:text-white' />
        </button>

        <Form onSubmit={handleSubmit(onSubmit)} className='w-full gap-4'>
        <FormControl className={`${errors.type ? 'animate-shake' : undefined}`}>
            <div className='flex gap-4'>
              <div
                className='flex items-center gap-2'
              >
                <input
                  className='-mt-1 accent-indigo-500'
                  type='radio'
                  id='movie'
                  value='filme'
                  {...register('type')}
                />
                <Label htmlFor='movie'>Filme</Label>
              </div>
              <div
                className='flex items-center gap-2'
              >
                <input
                  className='-mt-1 accent-indigo-500'
                  type='radio'
                  id='serie'
                  value='série'
                  {...register('type')}
                />
                <Label htmlFor='serie'>Série</Label>
              </div>
            </div>
          </FormControl>
          <FormControl className={`${errors.title ? 'animate-shake' : undefined}`}>
            <Label
              htmlFor='title'
              className='mb-2'
            >
              Título
            </Label>
            <input
              className='-mt-1  w-full dark:border-dark focus:outline-none focus:border-indigo-600 p-2   border rounded-md'
              type='text'
              id='title'
              {...register('title')}
            />
          </FormControl>
          
          <FormControl  className={`${ratingError ? 'animate-shake' : undefined}`}>
            <Label htmlFor='title' className='mb-2'>
              Nota
            </Label>
            <div className='flex gap-1'>
              <ReactStars
                onChange={ratingChanged}
                isHalf={true}
                size={32}
                activeColor='#eab308'
                value={1}
              />
            </div>
          </FormControl>
          <FormControl className={`${errors.comment ? 'animate-shake' : undefined}`}>
            <textarea
              id='comment'
              placeholder='Comentários...'
              className='h-32 dark:border-dark focus:outline-none focus:border-indigo-600 p-2  w-full border rounded-md resize-none
              '
              {...register('comment')}
            />
          </FormControl>
          <FormControl className={`${errors.whereToWatch ? 'animate-shake' : undefined}`}>
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
          <FormControl className={`${errors.genre ? 'animate-shake' : undefined}`}>
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
