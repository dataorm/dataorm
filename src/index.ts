import { Attr } from './Attributes';
import { Database } from './Database/DB';
import { DBConfig } from './Database/DBConfig';
import { Model } from './Model';
import { OrmProvider } from './OrmProvider';

const DB = new DBConfig();

export { OrmProvider, Database, DB, Model, Attr };
