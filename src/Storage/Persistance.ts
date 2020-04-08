import { DB } from '../Database/DBConfig';

class Persistance {
  static persist(data: any) {
    if (DB.dbConfig.storage === 'LocalStorage') {
      localStorage.setItem('root', JSON.stringify(data));
    }
  }

  static get() {
    return localStorage.getItem('root');
  }
}

export { Persistance };
