import * as React from 'react';
import { User } from './models/User';

export function App() {
  const [name, setName] = React.useState('');

  const allUsers = User.get();

  try {
    const findUserById = User.firstOrFail();
    console.log(findUserById);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          User.create({ name });
          setName('');
        }}
      >
        <input value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">add</button>
      </form>

      <div>
        {allUsers.map((user: any) => {
          return (
            <div key={user.name}>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                key={user.id}
              >
                <div>{user.name}</div>
                <div>
                  <button onClick={() => User.delete(user.id)}>delete</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
