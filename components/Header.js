import { css } from '@emotion/react';
import Link from 'next/link';

const headerStyles = css`
  padding: 8px 14px;
  background: #e1e1e1;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  display: flex;
  gap: 5px;

  > div > a + a {
    margin-left: 10px;
  }

  > div {
    margin-right: auto;
    margin-left: 10px;
  }
`;

function Anchor({ children, ...restProps }) {
  // using a instead of Link since we want to force a full refresh
  return <a {...restProps}>{children}</a>;
}

export default function Header(props) {
  return (
    <header css={headerStyles}>
      🐒
      <div>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/animals">Animals</Link>
        <Link href="/fruits">Fruits</Link>
        <Link href="/api-frontend-animal-list">Animal List Frontend</Link>

        {/*
          This is how Next.js used to require
          links to be

          <Link href="/about">
          <a>About</a>
          </Link>
        */}
      </div>
      {props.user && (
        <Link href="/users/private-profile">{props.user.username}</Link>
      )}
      {props.user ? (
        // using custom component to work around ESLint error
        <Anchor href="/logout">Logout</Anchor>
      ) : (
        <>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </header>
  );
}
