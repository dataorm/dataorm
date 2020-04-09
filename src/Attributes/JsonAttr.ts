export class JsonAttr {
  protected model: any;
  protected isNull: boolean = false;

  constructor(model: any) {
    this.model = model;
  }

  public nullable() {
    this.isNull = true;

    return this;
  }
}
