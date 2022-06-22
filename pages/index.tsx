import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import baboon from '../public/baboon.jpeg';

type Props = {
  refreshUserProfile: () => Promise<void>;
};
export default function Home(props: Props) {
  useEffect(() => {
    props
      .refreshUserProfile()
      .catch(() => console.log('refresh user profile Failed'));
  }, [props]);
  return (
    <div>
      <Head>
        <title>Tierpark</title>
        <meta name="description" content="Dashboard for the application" />
      </Head>

      <main>
        <h1>Tierpark</h1>

        {/*
          Normal HTML, it will work but the image
          will not be optimized
        */}
        <img src="/baboon.jpeg" alt="Sassy baboon" />

        {/*
          The Next.js Image component will
          offer some optimizations here
        */}
        <Image src="/baboon.jpeg" alt="Sassy baboon" width="612" height="408" />

        {/*
          This is a way to avoid specifying
          the width and the height (using an
          image import)
        */}
        <Image src={baboon} alt="Sassy baboon" />
      </main>
    </div>
  );
}
