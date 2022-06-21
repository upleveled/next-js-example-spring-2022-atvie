import { css } from '@emotion/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RegisterResponseBody } from './api/register';

export const errorStyles = css`
  background-color: #c24b4b;
  color: white;
  padding: 5px;
  margin-top: 5px;
`;
export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<
    {
      message: string;
    }[]
  >([]);
  const router = useRouter();

  async function registerHandler() {
    const registerResponse = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const registerResponseBody: RegisterResponseBody =
      await registerResponse.json();

    console.log(registerResponseBody);

    // if we have error show an error message
    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return;
    }
    // redirect user to home
    await router.push(`/`);
    // you may want to return to the user profile too
    // await router.push(`/users/${registerResponseBody.user.id}`);
  }

  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="registration" content="Register a new user" />
      </Head>

      <main>
        <h1>Register</h1>

        <label>
          username:{' '}
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.currentTarget.value);
            }}
          />
        </label>

        <label>
          password:{' '}
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.currentTarget.value);
            }}
          />
        </label>
        <button onClick={() => registerHandler()}>Register</button>
        {errors.map((error) => (
          <div css={errorStyles} key={`error-${error.message}`}>
            {error.message}
          </div>
        ))}
      </main>
    </div>
  );
}
