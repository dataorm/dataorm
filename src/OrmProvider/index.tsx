import React, { createContext, useEffect, useState } from 'react';
import { Database } from '../Database/DB';
import { Action } from '../Database/types';
import { Persistance } from '../Storage/Persistance';
import { Mutation } from '../Store/Mutation';
import { Query } from '../Store/Query';

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

  db.setState(context);

  useEffect(() => {
    db.subscribe((data: any) => {
      Persistance.persist(data);
    });
  }, []);

  useEffect(() => {
    db.setDispatch(({ type, payload }: Action) => {
      const mutation: any = new Mutation(setContext);
      mutation[type](payload);
      db.fire(context);
    });
  }, [db]);

  useEffect(() => {
    db.setGetters(({ type, payload }: Action) => {
      const query: any = new Query();
      query[type](payload);
    });
  }, [db]);

  return (
    <OrmContext.Provider value={{ context, setContext }}>
      {children}
    </OrmContext.Provider>
  );
};
