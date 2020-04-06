import * as React from 'react';
import { User } from './models/User';

export function App() {
  const [name, setName] = React.useState('');

  const allUsers = User.get();
  const firstUser = User.first();
  const findUser = User.find(2);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          User.create({ name });
          setName('');
        }}
      >
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">add</button>
      </form>

      <pre>All {JSON.stringify(allUsers)}</pre>
      <pre>First {JSON.stringify(firstUser)}</pre>
      <pre>Find {JSON.stringify(findUser)}</pre>
    </div>
  );
}
