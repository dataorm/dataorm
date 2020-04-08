import * as React from 'react';
import { User } from './models/User';

export function Home() {
  const nameRef = React.useRef('');
  const emailRef = React.useRef('');

  const allUsers = User.get();

  const users = User.query()
    .where('name', '=', 'kapu')
    .orWhere('email', '=', 'kalpit@gmail.com')
    .get();

  console.log(users, 'users');

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          User.create({
            name: nameRef.current.value,
            email: emailRef.current.value,
          });
          emailRef.current.value = '';
          nameRef.current.value = '';
        }}
      >
        <input placeholder="email" ref={emailRef} />
        <input placeholder="name" ref={nameRef} />
        <button type="submit">add</button>
      </form>

      <div>
        {allUsers.map((user: any) => {
          return (
            <div key={user.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: 10,
                }}
              >
                <div style={{ marginRight: 10, width: 100 }}>{user.name}</div>
                <div style={{ marginRight: 10, width: 200 }}>{user.email}</div>
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
