import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '../layouts/Layout';
import { Provider } from 'react-redux';
import store from '../store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  
  return (
    <ThemeProvider attribute='class'>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
