class Subject {
  protected observers: any[] = [];

  public subscribe(fn: any) {
    this.observers.push(fn);

    return () => this.unsubscribe(fn);
  }

  public fire(data: object) {
    this.observers.forEach((fn: any) => {
      fn(data);
    });
  }

  public unsubscribe(fnr: Function) {
    this.observers = this.observers.filter(fn => fn !== fnr);
  }
}

export { Subject };
