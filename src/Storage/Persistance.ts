import { OrmStore } from '../Database/OrmStore';

class Persistance {
  static persist(data: any) {
    if (OrmStore.dbConfig.storage === 'LocalStorage') {
      localStorage.setItem('root', JSON.stringify(data));
    }
  }

  static get() {
    return localStorage.getItem('root');
  }
}

export { Persistance };
