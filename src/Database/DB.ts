import { DbConfig } from './types';

class Database {
  static instance: Database;

  initialized: boolean = false;

  dbConfig: DbConfig = {
    name: 'db',
    storage: 'LocalStorage',
  };

  models: any[] = [];

  state: any = {};

  dispatch: any;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }

  setDispatch(dispatch: Function) {
    this.dispatch = dispatch;
  }

  setState(state: any) {
    this.state = state;
  }
}

export { Database };
