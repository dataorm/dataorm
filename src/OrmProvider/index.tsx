import React, { createContext, useEffect, useState } from 'react';
import { Database } from '../Database/DB';
import { Persistance } from '../Storage/Persistance';

const OrmContext = createContext({});

export const OrmProvider = ({ children }: any) => {
  const db: Database = Database.getInstance();

  if (!db.initialized) {
    throw new Error('You might forget to initialize database');
  }

  const persisted = Persistance.get();

  const [context, setContext] = useState(
    persisted ? JSON.parse(persisted) : db.state
  );

  useEffect(() => {
    Persistance.persist();

    const setDispatch = (data: any) => {
      setContext(data);
      db.fire(context);
    };

    db.setDispatch(setDispatch);
  }, [db]);

  db.setState(context);

  return (
    <OrmContext.Provider value={{ context, setContext }}>
      {children}
    </OrmContext.Provider>
  );
};
