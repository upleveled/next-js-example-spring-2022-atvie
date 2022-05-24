import { css, Global } from '@emotion/react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
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
      <Layout>
        {/*
          The "Component" component refers to
          the current page that is being rendered
        */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
