import Head from 'next/head';
import { getUserByValidSessionToken } from '../util/database';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="About the app" />
      </Head>

      <main>
        <h1>About the app</h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const user = await getUserByValidSessionToken(
    context.req.cookies.sessionToken,
  );

  if (user) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: `/login?returnTo=/about`,
      permanent: false,
    },
  };
}
