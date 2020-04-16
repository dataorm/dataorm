import { Relations } from './Relations';
import { Model } from '../../Model/Model';

export class BelongsTo extends Relations {
  protected isNull = false;
  protected defaultValue: any;

  public parent: any;
  public foreignKey: string;
  public ownerKey: string;

  constructor(
    model: typeof Model,
    parent: typeof Model,
    foreignKey: string,
    ownerKey: string
  ) {
    super(model);

    this.parent = parent;
    this.foreignKey = foreignKey;
    this.ownerKey = ownerKey;
  }

  define(schema: any) {
    return schema.one(this.parent);
  }
}
