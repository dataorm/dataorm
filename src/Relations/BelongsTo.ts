export class BelongsTo {
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

  static make(model: any, relation: any, key: any) {
    console.log(relation, key);

    return new BelongsTo(model);
  }
}
