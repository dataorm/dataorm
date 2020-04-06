class Mutation {
  public setContext: Function;

  constructor(setContext: Function) {
    this.setContext = setContext;
  }

  create() {
    console.log('create', this);
  }

  update(id: any) {
    console.log(id);
  }

  delete(id: any) {
    console.log(id);
  }
}

export { Mutation };
