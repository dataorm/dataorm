import * as React from 'react';
import { User } from './models/User';

export function Home() {
  const users = User.all();

  return (
    <div>
      <pre>{JSON.stringify(users, null, 1)}</pre>
    </div>
  );
}
