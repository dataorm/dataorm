export class IdAttribute {
  public static create(model: any) {
    return (value: any, _parentValue: any, _key: any) => {
      this.generateIds(value, model);
      var indexId = this.generateIndexId(value, model);
      return indexId;
    };
  }

  private static generateIds(record: any, model: any) {
    var keys =
      model.primaryKey instanceof Array ? model.primaryKey : [model.primaryKey];

    keys.forEach(function(k: any) {
      if (record[k] !== undefined && record[k] !== null) {
        return;
      }

      var attr = model.getFields()[k];

      record[k] = attr.make();
    });
  }

  private static generateIndexId(record: any, model: any) {
    record.$id = model.getIndexIdFromRecord(record);
    return record.$id;
  }
}
