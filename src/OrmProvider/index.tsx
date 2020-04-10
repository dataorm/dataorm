import React from 'react';

export const OrmProvider = ({ children, store }: any) => {
  if (!store || !store.init) {
    throw new Error('You might forget to initialize database');
  }

  const [updatedStore, setUpdatedStore] = React.useState(store);

  React.useEffect(() => {
    store.setState = (newState: any) => {
      store.state = newState;

      setUpdatedStore({ ...updatedStore, state: newState });
    };
  }, [store, updatedStore]);

  return React.cloneElement(children, {
    store: updatedStore,
  });
};
