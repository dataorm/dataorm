import { Relations } from './Relations';

export class BelongsTo extends Relations {
  protected isNull = false;
  protected defaultValue: any;

  public parent: any;
  public foreignKey: string;
  public ownerKey: string;

  constructor(model: any, parent: any, foreignKey: string, ownerKey: string) {
    super(model);

    this.parent = parent;
    this.foreignKey = foreignKey;
    this.ownerKey = ownerKey;
  }

  define(schema: any) {
    return schema.one(this.parent);
  }
}
