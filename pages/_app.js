import { css, Global } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';

const cookieBannerStyles = (isOpen) => css`
  height: ${isOpen ? '25px' : 0};
  overflow: hidden;
  transition: all 200ms ease-in;
`;

export default function App({ Component, pageProps }) {
  const [areCookiesAccepted, setAreCookiesAccepted] = useState(false);
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const profileResponse = await fetch('/api/profile');

    const profileResponseBody = await profileResponse.json();

    if (!('errors' in profileResponseBody)) {
      setUser(profileResponseBody.user);
    } else {
      profileResponseBody.errors.forEach((error) => console.log(error.message));
      setUser(undefined);
    }
  }, []);

  function cookieBannerButtonHandler() {
    // 2. set the value for the cookieBanner
    setLocalStorage('areCookiesAccepted', true);
    setAreCookiesAccepted(true);
  }

  // useEffect is only frontend
  useEffect(() => {
    // 1. we need to check if there is already a value for the cookieBanner
    if (getLocalStorage('areCookiesAccepted')) {
      setAreCookiesAccepted(getLocalStorage('areCookiesAccepted'));
    }

    refreshUserProfile().catch(() => console.log('fetch api failed'));
  }, [refreshUserProfile]);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI,
              Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
              Helvetica Neue, sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />

      {/*
        Layout wraps all pages, if used within
        pages/_app.js

        If you want to apply the layout (header
        and footer) to only some pages but not
        all of them, you can remove the Layout
        from pages/_app.js
      */}
      <div css={cookieBannerStyles(!areCookiesAccepted)}>
        cookie banner{' '}
        <button
          onClick={() => {
            cookieBannerButtonHandler();
          }}
        >
          yes
        </button>
      </div>
      {/* React omit some dataStructures/ types from the component render the solution is JSON.stringify */}
      {[[], false, null, undefined]}
      <Layout user={user}>
        {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
        <Component {...pageProps} refreshUserProfile={refreshUserProfile} />
      </Layout>
    </>
  );
}
