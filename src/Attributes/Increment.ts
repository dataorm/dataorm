export class Increment {
  protected model: any;
  protected isNull = false;
  protected defaultValue: any;

  constructor(model: any) {
    this.model = model;
  }

  public nullable() {
    this.isNull = true;

    return this;
  }

  public default(defaultValue: any) {
    this.defaultValue = defaultValue;

    return this;
  }

  static make(model: any) {
    return new Increment(model);
  }
}
