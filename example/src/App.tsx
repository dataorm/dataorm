import * as React from 'react';
import { User } from './models/User';

export function App() {
  const [name, setName] = React.useState('');

  const users = User.get();

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

      <pre>{JSON.stringify(users)}</pre>
    </div>
  );
}
