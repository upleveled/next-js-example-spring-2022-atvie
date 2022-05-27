import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  padding: 8px 14px;
  background: #e1e1e1;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;

  > div > a + a {
    margin-left: 10px;
  }
`;

export default function Header() {
  return (
    <header css={headerStyles}>
      🐒
      <div>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/animals">Animals</Link>
        <Link href="/fruits">Fruits</Link>
        {/*
          This is how Next.js used to require
          links to be

          <Link href="/about">
            <a>About</a>
          </Link>
        */}
      </div>
    </header>
  );
}
