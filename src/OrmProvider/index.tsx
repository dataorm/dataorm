import React from 'react';
import { Database } from '../Store/Database';
import { Store } from '../Store/Store';

export const OrmProvider = ({
  children,
  database,
}: {
  children: any;
  database: Database;
}) => {
  if (!database || !database.initialized) {
    throw new Error('You might forget to initialize database');
  }

  const store: Store = database.store;

  const [updatedStore, setUpdatedStore] = React.useState(store);

  React.useEffect(() => {
    const unsubscribe = store.subscribe((store: Store) => {
      setUpdatedStore(store);
    });

    return () => unsubscribe();
  }, [store, updatedStore]);

  return React.cloneElement(children, {
    store: updatedStore,
  });
};
