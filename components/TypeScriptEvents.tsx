import { ChangeEvent, useState } from 'react';

export default function TypeScriptEvents() {
  const [name, setName] = useState('');

  // In this case, because the function is not inside
  // the JSX, you need to import the type from React
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  return (
    <div>
      <input
        value={name}
        // This is no problem, because the function is inline
        onChange={(event) => {
          setName(event.currentTarget.value);
        }}
      />

      <input
        value={name}
        // This is no problem, because the function is inline
        onChange={handleChange}
      />
    </div>
  );
}
