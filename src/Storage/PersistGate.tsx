import { useState } from 'react';

export const PersistGate = ({ children, loading = null, persistor }: any) => {
  const { store, config } = persistor;
  const key = config.key || 'root';
  const [resolved, setResolve] = useState(false);

  config.storage.getItem(key).then((data: any) => {
    const persistedData = data ? JSON.parse(data) : store.db.state;
    store.db.setState(persistedData);
    setResolve(true);
  });

  if (!resolved) {
    return loading;
  } else {
    return children;
  }
};
