import * as React from 'react';
import { User } from './models/User';

export function Home() {
  const [updatableUser, setUpdatableUser] = React.useState(null);

  const nameRef = React.useRef('');
  const emailRef = React.useRef('');

  const users = User.query()
    .orderBy('id', 'desc')
    .get();

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
          };

          if (updatableUser !== null) {
            User.query()
              .where('id', '=', updatableUser.id)
              .update(data);
          } else {
            User.create(data);
          }

          emailRef.current.value = '';
          nameRef.current.value = '';
        }}
      >
        <input placeholder="email" ref={emailRef} />
        <input placeholder="name" ref={nameRef} />

        {updatableUser ? (
          <button type="submit">update</button>
        ) : (
          <button type="submit">add</button>
        )}
      </form>

      <div>
        {users.data.map((user: any) => {
          return (
            <div key={user.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: 10,
                }}
              >
                <div style={{ marginRight: 10, width: 300 }}>{user.id}</div>
                <div style={{ marginRight: 10, width: 200 }}>{user.email}</div>
                <div style={{ marginRight: 10, width: 100 }}>{user.name}</div>
                <div>
                  <button onClick={() => User.delete(user.id)}>delete</button>
                  <button
                    onClick={() => {
                      emailRef.current.value = user.email;
                      nameRef.current.value = user.name;
                      setUpdatableUser(user);
                    }}
                  >
                    update
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
