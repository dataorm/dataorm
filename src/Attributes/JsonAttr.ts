export class JsonAttr implements ShouldBeValidField {
  protected model: any;
  protected isNull: boolean = false;

  constructor(model: any) {
    this.model = model;
  }

  public nullable() {
    this.isNull = true;

    return this;
  }

  validate(data: any, key: string) {
    if (
      data[key] instanceof Object === false ||
      data[key] instanceof Array === false
    ) {
      throw new Error('Not a valid JSON.');
    }
  }
}
