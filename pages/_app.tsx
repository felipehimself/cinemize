import '../styles/globals.css';
import Loading from '../components/Loading';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '../layouts/Layout';
import { Provider } from 'react-redux';
import { useIsLoading } from '../hooks/hooks';

import store from '../store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isLoading = useIsLoading();

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
