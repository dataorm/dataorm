import * as React from 'react';
import { User } from './models/User';

export function Home(props: any) {
  const [name, setName] = React.useState('');
  const users = User.get();

  console.log(props, 'props');
  console.log(users, 'users');

  return (
    <div>
      <pre>{JSON.stringify(users)}</pre>

      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <button onClick={() => User.create({ name: 'krunal' })}>click</button>
    </div>
  );
}
