import '../styles/globals.css';
import { useState } from 'react';
import Router from 'next/router';
import Loading from '../components/Loading';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '../layouts/Layout';
import { Provider } from 'react-redux';
import { useLoading } from '../hooks/hooks';

import store from '../store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const [loading, setLoading] = useState(false);
  const isLoading = useLoading();

  return (
    <ThemeProvider attribute='class'>
      <Provider store={store}>
        {isLoading ? (
          <Loading />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
