import { Database } from '../Database/DB';

class Persistance {
  private static db: Database = Database.getInstance();

  static persist(data: any) {
    if (this.db.dbConfig.storage === 'LocalStorage') {
      localStorage.setItem('root', JSON.stringify(data));
    }
  }

  static get() {
    return localStorage.getItem('root');
  }
}

export { Persistance };
