import { Subject } from '../Observer/Subject';
import { Action } from './types';

class Database extends Subject {
  static instance: Database;

  models: any[] = [];

  state: any = {};

  getState: (action: Action) => any = () => {};

  dispatch: (action: Action) => any = () => {};

  setState(state: any) {
    this.state = state;
  }

  setGetters(getState: (action: Action) => any) {
    this.getState = getState;
  }

  setDispatch(dispatch: (action: Action) => any) {
    this.dispatch = dispatch;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }
}

export { Database };
