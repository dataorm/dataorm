import { Relations } from './Relations';
import { Model } from '../../Model/Model';

export class BelongsToMany extends Relations {
  protected isNull = false;
  protected defaultValue: any;

  public related: typeof Model;
  public pivot: typeof Model;
  public foreignPivotKey: string;
  public relatedPivotKey: string;
  public parentKey: string;
  public relatedKey: string;

  constructor(
    model: typeof Model,
    related: typeof Model,
    pivot: typeof Model,
    foreignPivotKey: string,
    relatedPivotKey: string,
    parentKey: string,
    relatedKey: string
  ) {
    super(model);

    this.related = this.model.relation(related);
    this.pivot = this.model.relation(pivot);
    this.foreignPivotKey = foreignPivotKey;
    this.relatedPivotKey = relatedPivotKey;
    this.parentKey = parentKey;
    this.relatedKey = relatedKey;
  }

  define(schema: any) {
    return schema.one(this.related);
  }
}
