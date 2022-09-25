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

const Home: NextPage<{ options: string[]; genre: string[] }> = ({
  options,
  genre,
}) => {
  return (
    <>
      <Head>
        <title>cine.mize - home</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <div className='flex gap-5 py-14'>
        <div className='w-6/12'>
          <Form className='fixed w-4/12  pt-4 gap-3'>
            <FormControl>
              <Label htmlFor='suggestion' className='pl-1 mb-2'>
                Any movie or series suggestion?
              </Label>
              <TextArea
                name='suggestion'
                id='suggestion'
                placeholder='Start writting...'
                className='h-32'
              />
            </FormControl>
            <FormControl>
              <Label htmlFor='' className='mb-1'>
                Where to Watch?
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
                      <CheckBox className='' name={gen} id={gen} />
                      {gen}
                    </Label>
                  );
                })}
              </OptionsContainer>
            </FormControl>

            <Button className='p-2 rounded-md'>Post</Button>
          </Form>
        </div>

        {/* right container */}
        <div className='hidden lg:block flex-1 pt-10'>
          {Array.from(Array(200).keys()).map((item) => {
            return <p key={item}>{item}</p>;
          })}
        </div>
      </div>
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const options = ['netflix', 'amazon', 'star+'];
  const genre = ['triller', 'action', 'comedy'];

  return {
    props: {
      options,
      genre,
    },
  };
};
