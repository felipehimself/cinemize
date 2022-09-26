import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../../Components/Elements/Header';
import {
  TextArea,
  Label,
  Form,
  FormControl,
  CheckBox,
  Button,
} from '../../Components/UI/Index';
import OptionsContainer from '../../Components/Elements/OptionsContainer';
import PostCard from '../../Components/Elements/PostCard';
const Home: NextPage<{ options: string[]; genre: string[]; posts: any }> = ({
  options,
  genre,
  posts,
}) => {
  console.log(posts);

  return (
    <>
      <Head>
        <title>cine.mize - home</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <div className='flex gap-5 py-14'>
        <div className='hidden sm:block w-6/12 '>
          <Form className='fixed w-4/12 pt-8 gap-4'>
            <FormControl>
              <Label htmlFor='suggestion' className='mb-2'>
                Any movie or series suggestion?
              </Label>
              <div className='flex gap-4'>
                <div className='flex items-center gap-2'>
                  <input
                    className='-mt-1 accent-indigo-500'
                    type='radio'
                    name='type'
                    id='movie'
                  />
                  <Label htmlFor='movie'>Movie</Label>
                </div>
                <div className='flex items-center gap-2'>
                  <input
                    className='-mt-1 accent-indigo-500'
                    type='radio'
                    name='type'
                    id='serie'
                  />
                  <Label htmlFor='serie'>Tv Series</Label>
                </div>
              </div>
            </FormControl>
            <FormControl>
              <TextArea
                name='suggestion'
                id='suggestion'
                placeholder='Start writting...'
                className='h-32'
              />
            </FormControl>

            <FormControl>
              <Label htmlFor='' className='mb-1'>
                Where to watch?
              </Label>
              <OptionsContainer>
                {options.map((option) => {
                  return (
                    <Label
                      key={option}
                      className='flex gap-2 mr-2 capitalize'
                      htmlFor={option}
                    >
                      <CheckBox className='' name={option} id={option} />
                      {option}
                    </Label>
                  );
                })}
              </OptionsContainer>
            </FormControl>

            <FormControl>
              <Label htmlFor='' className='mb-1'>
                Genre
              </Label>
              <OptionsContainer>
                {genre.map((gen) => {
                  return (
                    <Label
                      key={gen}
                      className='flex gap-2 mr-2 capitalize'
                      htmlFor={gen}
                    >
                      <CheckBox className={gen} name={gen} id={gen} />
                      {gen}
                    </Label>
                  );
                })}
              </OptionsContainer>
            </FormControl>

            <Button className='p-2 rounded-md mt-2'>Post</Button>
          </Form>
        </div>

        {/* right container */}
        <div className='flex-1 flex flex-col gap-4 pt-8'>
          {posts.map((post: any) => {
            return (
              <PostCard key={post.id} {...post} />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const options = [
    'netflix',
    'amazon',
    'star+',
    'hbo max',
    'youtube',
    'disney+',
  ];
  const genre = ['triller', 'action', 'comedy'];

  const posts = [
    {
      id: '1',
      user: 'cinemize',
      title: 'O segredo dos seus olhos',
      genres: ['triller', 'action'],
      comment: 'this is an amazing movie',
      whereToWatch: ['netflix', 'amazon'],
      type:'movie'
    },
    {
      id: '2',
      user: 'cinemize',
      title: 'O segredo dos seus olhos',
      genres: ['triller', 'action'],
      comment: 'this is an amazing movie',
      whereToWatch: ['netflix', 'amazon'],
      type:'movie'
    },
    {
      id: '3',
      user: 'cinemize',
      title: 'O segredo dos seus olhos',
      genres: ['triller', 'action'],
      comment: 'this is an amazing movie',
      whereToWatch: ['netflix', 'amazon'],
      type:'movie'
    },
  ];

  return {
    props: {
      options,
      genre,
      posts,
    },
  };
};
