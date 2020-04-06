import * as React from 'react';
import { User } from './models/User';

export function App() {
  const [name, setName] = React.useState('');

  const allUsers = User.get();

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

      <div>
        {allUsers.map((user: any) => {
          return (
            <div key={user.name}>
              <div onClick={() => User.update({ id: 1, name: 'jayesh' })}>
                {user.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
