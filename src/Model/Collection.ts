class Collection {
  public model: any;

  public constructor(model: any) {
    this.model = model;
  }

  public get() {
    console.log('okay');
  }
}

export { Collection };
