import { Relations } from './Relations';

export class HasMany extends Relations {
  protected isNull = false;
  protected defaultValue: any;

  public related: any;
  public foreignKey: string;
  public localKey: string;

  constructor(model: any, related: any, foreignKey: string, localKey: string) {
    super(model);

    this.related = related;
    this.foreignKey = foreignKey;
    this.localKey = localKey;
  }

  define(schema: any) {
    return schema.many(this.related);
  }
}
