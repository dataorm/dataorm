import * as React from 'react';
import { User } from './models/User';

export function Home() {
  const [name, setName] = React.useState('');
  const users = User.all();

  const user: any = new User();
  user.name = 'krunal';
  user.save();

  console.log(user);

  return (
    <div>
      <pre>{JSON.stringify(users, null, 1)}</pre>

      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <button onClick={() => User.create({ name })}>click</button>
    </div>
  );
}
