import { Fields } from '../Attributes/Fields/Fields';
import { UuidField } from '../Attributes/Fields/UuidField';

export class IdAttribute {
  public static create(model: any) {
    return (record: any, _parentRecord: any, _key: any) => {
      this.generateIds(record, model);
      const indexId = this.generateIndexId(record, model);
      return indexId;
    };
  }

  private static generateIds(record: any, model: any) {
    const keys =
      model.primaryKey instanceof Array ? model.primaryKey : [model.primaryKey];

    keys.forEach(function(k: any) {
      if (record[k] !== undefined && record[k] !== null) {
        return;
      }

      const attr = model.fields()[k];

      record[k] =
        attr instanceof Fields
          ? attr.make(record, k)
          : new UuidField(model).make(record, k);
    });
  }

  private static generateIndexId(record: any, model: any) {
    record.$id = model.getIndexIdFromRecord(record);
    return record.$id;
  }
}
