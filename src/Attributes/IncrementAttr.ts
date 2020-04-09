export class IncrementAttr implements ShouldBeValidField {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  validate(data: any, key: string) {
    if (key === this.model.primaryKey && Math.sign(data[key]) !== 1) {
      throw new Error('Primary key must be a positive number.');
    }

    // if (
    //   this.model.collection.filter((col: any) => col[key] === data[key]).length
    // ) {
    //   throw new Error(`Record with Primary key ${data[key]} alread exits.`);
    // }
  }
}
