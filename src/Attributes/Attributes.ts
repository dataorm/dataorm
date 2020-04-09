import { BooleanAttr } from './BooleanAttr';
import { DatetimeAttr } from './DatetimeAttr';
import { IncrementAttr } from './IncrementAttr';
import { JsonAttr } from './JsonAttr';
import { NumberAttr } from './NumberAttr';
import { StringAttr } from './StringAttr';
import { UuidAttr } from './UuidAttr';

export class Attributes {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  public increment() {
    return new IncrementAttr(this.model);
  }

  public uuid() {
    return new UuidAttr(this.model);
  }

  public string() {
    return new StringAttr(this.model);
  }

  public json() {
    return new JsonAttr(this.model);
  }

  public number() {
    return new NumberAttr(this.model);
  }

  public boolean() {
    return new BooleanAttr(this.model);
  }

  public datetime() {
    return new DatetimeAttr(this.model);
  }
}
