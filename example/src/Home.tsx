import * as React from 'react';
import { User } from './models/User';

export function Home() {
  const [name, setName] = React.useState('');

  const allUsers = User.get();

  const users = User.query()
    .where('name', '=', 'krunal')
    .orWhere('name', '=', 'kapu')
    .get();

  console.log(users, 'users');

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
              <div style={{ display: 'flex', flexDirection: 'row' }} key="Test">
                <div>
                  {user.id}
                  {user.name}
                </div>
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
