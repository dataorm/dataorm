import React, { createContext, useEffect, useState } from 'react';
import { Database } from '../Database/DB';

const OrmContext = createContext({});

export const OrmProvider = ({ children }: any) => {
  const db: Database = Database.getInstance();

  if (!db.initialized) {
    throw new Error('You might forget to initialize database');
  }

  console.log(db, 'db');

  const [context, setContext] = useState(db.state);

  useEffect(() => {
    db.setDispatch(setContext);
  }, [db]);

  db.setState(context);

  return (
    <OrmContext.Provider value={{ context, setContext }}>
      {children}
    </OrmContext.Provider>
  );
};
