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
      <div className='fixed right-4 top-5 z-20'>
        <ColorMode className='fill-white' size={20} />
      </div>
      <Header />
      {/* <Sidebar /> */}
    </>
  );
};
export default Home;
