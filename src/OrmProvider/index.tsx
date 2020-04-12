import React from 'react';

export const OrmProvider = ({ children, store }: any) => {
  if (!store || !store.init) {
    throw new Error('You might forget to initialize database');
  }

  const [updatedStore, setUpdatedStore] = React.useState(store);

  React.useEffect(() => {
    const unsubscribe = store.subscribe((state: any) => {
      setUpdatedStore({ ...updatedStore, state });
    });

    return () => unsubscribe();
  }, [store, updatedStore]);

  return React.cloneElement(children, {
    store: updatedStore,
  });
};
