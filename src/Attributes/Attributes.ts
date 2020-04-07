import { Increment } from './Increment';
import { Uuid } from './Uuid';
import { String } from './String';

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
}
