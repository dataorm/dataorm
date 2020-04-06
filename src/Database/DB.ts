import { Subject } from '../Observer/Subject';
import { DbConfig, Action } from './types';

class Database extends Subject {
  static instance: Database;

  initialized: boolean = false;

  dbConfig: DbConfig = {
    name: 'db',
    storage: 'LocalStorage',
  };

  models: any[] = [];

  state: any = {};

  getState: (action: Action) => any = () => {};

  dispatch: (action: Action) => any = () => {};

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }

  setState(state: any) {
    this.state = state;
  }

  setGetters(getters: (action: Action) => any) {
    this.getState = getters;
  }

  setDispatch(dispatch: (action: Action) => any) {
    this.dispatch = dispatch;
  }
}

export { Database };
