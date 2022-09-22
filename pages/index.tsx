import Head from 'next/head';
import Image from 'next/image';
import baboon from '../public/baboon.jpeg';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tierpark</title>
        <meta name="description" content="Dashboard for the application" />
      </Head>

      <main>
        <h1>Tierpark updated</h1>

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
