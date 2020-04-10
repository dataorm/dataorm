import * as React from 'react';
import { User } from './models/User';

export function Home(props: any) {
  const users = User.get();

  console.log(props, 'props');
  console.log(users, 'users');

  return (
    <div>
      <pre>{JSON.stringify(users)}</pre>

      <button onClick={() => User.create({ name: 'krunal' })}>click</button>
    </div>
  );
}
