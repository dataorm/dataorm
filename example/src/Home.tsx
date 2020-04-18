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
              id: 1,
              name: 'test',
              posts: [{ id: 1, title: 'hello' }],
              roles: [
                { id: 1, name: 'admin' },
                { id: 2, name: 'designer' },
              ],
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
