export class UuidAttr implements ShouldBeValidField {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  validate(data: any, key: string) {
    if (
      key === this.model.primaryKey &&
      !data[key].match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    ) {
      throw new Error('Primary key must be a valid UUID.');
    }

    // if (
    //   this.model.collection.filter((col: any) => col[key] === data[key]).length
    // ) {
    //   throw new Error(`Record with Primary key ${data[key]} alread exits.`);
    // }
  }
}
