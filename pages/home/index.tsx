import Head from 'next/head';
import Header from '../../Components/Elements/Header';
import ColorMode from '../../Components/ColorMode/ColorMode';
import Sidebar from '../../Components/Elements/Sidebar';
const Home = () => {
  return (
    <>
      <Head>
        <title>cine.mize - home</title>
        <meta name='home page' content='User home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <div className='fixed right-4 top-5 z-20'>
        <ColorMode className='fill-white' size={20} />
      </div> */}
      <Header />

      <div className='pt-16 flex gap-8 '>
        {/* left container */}

        {/* <Sidebar /> */}



        {/* center container */}
        <div className='flex-1 pt-4'>
          <h3 className='text-md mb-3'>Any movie or series suggestion?</h3>
          <textarea name="" id="" placeholder='Start writting...' className='dark:border-dark focus:outline-none focus:border-indigo-600 p-2 h-24 w-full border rounded-md resize-none ' ></textarea>
        </div>


        {/* right container */}
        <div className='hidden lg:block flex-1'>
         { Array.from(Array(200).keys()).map((item)=> {
          return <p key={item}>{item}</p>
         }) }
        </div>

      </div>



    </>
  );
};
export default Home;
