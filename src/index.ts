import { Database } from './Database/DB';
import { DBConfig } from './Database/DBConfig';
import { Model } from './Model/Model';
import { OrmProvider } from './OrmProvider';

const DB = new DBConfig();

export { OrmProvider, Database, DB, Model };
