import Head from 'next/head';
import Link from 'next/link';

export default function NaiveIndex() {
  return (
    <div>
      <Head>
        <title>Animal Management (naive, don't copy)</title>
        <meta
          name="description"
          content="Animal Management (naive, don't copy)"
        />
      </Head>

      <h1>Animal Management</h1>

      <ul>
        <li>
          <Link href="/animal-management-naive-dont-copy/insert">Create</Link>
          {/* I need to pass all in query params - I don't have body */}
        </li>
        <li>
          <Link href="/animal-management-naive-dont-copy/read">Read</Link>
        </li>
        <li>
          <Link href="/animal-management-naive-dont-copy/update">Update</Link>
        </li>
        <li>
          <Link href="/animal-management-naive-dont-copy/delete">Delete</Link>
        </li>
      </ul>
    </div>
  );
}
