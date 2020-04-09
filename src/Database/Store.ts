import { Action } from './types';

class Store {
  private static _instance: Store;

  models: any[] = [];

  state: any = {};

  config: any = {};

  constructor() {
    if (Store._instance) {
      throw new Error('Already initialized');
    }

    Store._instance = this;
  }

  public static get instance(): Store {
    return this._instance;
  }

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
}

export { Store };
