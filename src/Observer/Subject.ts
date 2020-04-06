class Subject {
  protected observers: Function[] = [];

  public subscribe(fn: Function) {
    this.observers.push(fn);

    return () => this.unsubscribe(fn);
  }

  public fire(data: object) {
    this.observers.forEach((fn: Function) => {
      fn(data);
    });
  }

  public unsubscribe(fnr: Function) {
    this.observers = this.observers.filter((fn) => fn !== fnr);
  }
}

export { Subject };
