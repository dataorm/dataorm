import * as React from 'react';
import { User } from './models/User';

export function Home() {
  const [name, setName] = React.useState('');
  const nameRef = React.useRef<any>('');
  const users = User.all();

  return (
    <div>
      <pre>{JSON.stringify(users, null, 1)}</pre>

      <form
        onSubmit={e => {
          e.preventDefault();
          User.create([
            {
              name: 'test',
              age: 20,
              posts: [{ title: 'test', description: 'yahoo' }],
            },
          ]);
          setName('');
        }}
      >
        <input
          type="text"
          ref={nameRef}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button>click</button>
      </form>
    </div>
  );
}
