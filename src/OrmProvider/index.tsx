import React, { createContext, useEffect, useState } from 'react';
import { Database } from '../Database/DB';
import { DB } from '../Database/DBConfig';
import { Action } from '../Database/types';
import { Persistance } from '../Storage/Persistance';
import { Mutation } from '../Store/Mutation';
import { Query } from '../Store/Query';

const OrmContext = createContext({});

export const OrmProvider = ({ children }: any) => {
  const db: Database = Database.getInstance();

  if (!DB.initialized) {
    throw new Error('You might forget to initialize database');
  }

  const persisted = Persistance.get();

  const persistedData = persisted ? JSON.parse(persisted) : db.state;

  const [context, setContext]: any = useState(persistedData);

  db.setState(context);

  db.setGetters(({ type, payload }: Action) => {
    const query: any = new Query();
    const results = query[type]({ type, payload });

    return results;
  });

  useEffect(() => {
    db.setDispatch(({ type, payload }: Action) => {
      const mutation: any = new Mutation(setContext);
      const results = mutation[type]({ type, payload });

      return results;
    });
  }, [db]);

  useEffect(() => {
    db.subscribe((data: any) => {
      Persistance.persist(data);
    });
  }, [db]);

  return (
    <OrmContext.Provider value={{ context, setContext }}>
      {children.type.hasOwnProperty('type')
        ? children.type.type()
        : children.type()}
    </OrmContext.Provider>
  );
};
