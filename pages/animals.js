import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { animalsDatabase } from '../util/database';

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

export default function Animals(props) {
  return (
    <div>
      <Head>
        <title>Animals</title>
        <meta name="description" content="List of various animals" />
      </Head>

      <h1>Animals</h1>

      <div css={animalsListStyles}>
        {props.animals.map((animal) => {
          return (
            <div key={`animal-${animal.id}`} css={animalsListItemStyles}>
              <div>
                Name: <Link href={`/animals/${animal.id}`}>{animal.name}</Link>
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
export function getServerSideProps() {
  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter
    props: {
      animals: animalsDatabase,
    },
  };
}
