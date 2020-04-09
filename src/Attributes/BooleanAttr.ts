export class BooleanAttr {
  protected model: any;
  protected defaultValue: boolean = false;

  constructor(model: any) {
    this.model = model;
  }

  public default(defaultValue: any) {
    this.defaultValue = defaultValue;

    return this;
  }
}
