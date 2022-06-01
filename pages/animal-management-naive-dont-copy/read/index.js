import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { getAnimals } from '../../../util/database';

const animalsListStyles = css`
  background: #dfd;
  padding: 10px;
`;

const animalsListItemStyles = css`
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fdfdfd;
  padding: 12px 16px;

  & + & {
    margin-top: 10px;
  }
`;

const linkContainerStyles = css`
  border: black 2px solid;
  a:visited {
    color: red;
  }
`;

export default function ReadAnimals(props) {
  return (
    <div>
      <Head>
        <title>Animals - Read</title>
        <meta name="description" content="List of various animals" />
      </Head>

      <h1>Animals</h1>

      <div css={animalsListStyles}>
        {props.animals.map((animal) => {
          return (
            <div key={`animal-${animal.id}`} css={animalsListItemStyles}>
              <div css={linkContainerStyles}>
                Name:{' '}
                <Link
                  href={`/animal-management-naive-dont-copy/read/${animal.id}`}
                >
                  {animal.firstName}
                </Link>
              </div>
              <div>Type: {animal.type}</div>
              <div>Accessory: {animal.accessory}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Code in getServerSideProps runs in
// Node.js (on the server)
//
// Important: ONLY in the /pages directory
export async function getServerSideProps() {
  const animals = await getAnimals();
  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      animals: animals,
    },
  };
}
