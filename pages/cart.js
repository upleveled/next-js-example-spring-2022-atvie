import { useState } from 'react';

export default function Cart(props) {
  const [value, setValue] = useState([]);

  return (
    <div>
      {value.map((el) => (
        <div key={el}>{el}</div>
      ))}

      <button onClick={() => setValue([{ msg: 'this is going to break' }])}>
        error me {props.csrfToken}
      </button>
    </div>
  );
}

export function getServerSideProps() {
  return {
    // Anything that you pass in the props
    // object will get passed to the component
    // at the top in the `props` parameter

    props: { csrfToken: process.env.CSRF },
  };
}
