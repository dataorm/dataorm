import { Relations } from './Relations';
import { Model } from '../../Model/Model';

export class HasMany extends Relations {
  protected isNull = false;
  protected defaultValue: any;

  public related: any;
  public foreignKey: string;
  public localKey: string;

  constructor(
    model: typeof Model,
    related: typeof Model,
    foreignKey: string,
    localKey: string
  ) {
    super(model);

    this.related = related;
    this.foreignKey = foreignKey;
    this.localKey = localKey;
  }

  define(schema: any) {
    return schema.many(this.related);
  }
}
