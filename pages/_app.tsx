import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { StoreProvider } from 'store/index';
import Layout from 'components/layout';
import { IUserStore } from '../store/userStore';

interface IProps extends AppProps {
  initialValue: IUserStore;
}

function App({ initialValue, Component, pageProps }: IProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx?.req.cookies;

  return {
    initialValue: {
      user: {
        userInfo: { userId, nickname, avatar },
      },
    },
  };
};

export default App;
