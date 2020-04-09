import React, { createContext, useEffect, useState } from 'react';
import { Action } from '../Database/types';
import { Mutation } from '../Store/Mutation';
import { Query } from '../Store/Query';

const OrmContext = createContext({});

export const OrmProvider = ({ children, store }: any) => {
  if (!store || !store.initialized) {
    throw new Error('You might forget to initialize database');
  }

  const db = store.db;

  const [context, setContext]: any = useState(db.state);

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

  return (
    <OrmContext.Provider value={{ context, setContext }}>
      {children.type.hasOwnProperty('type')
        ? children.type.type()
        : children.type()}
    </OrmContext.Provider>
  );
};
