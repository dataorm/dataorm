import { Boolean } from './Boolean';
import { Datetime } from './Datetime';
import { Increment } from './Increment';
import { Json } from './Json';
import { Number } from './Number';
import { String } from './String';
import { Uuid } from './Uuid';

export class Attributes {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  public increment() {
    return Increment.make(this.model);
  }

  public uuid() {
    return Uuid.make(this.model);
  }

  public string() {
    return String.make(this.model);
  }

  public json() {
    return Json.make(this.model);
  }

  public number() {
    return Number.make(this.model);
  }

  public boolean() {
    return Boolean.make(this.model);
  }

  public datetime() {
    return Datetime.make(this.model);
  }
}
