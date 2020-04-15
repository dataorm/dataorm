import { Model } from '../Model/Model';

export class Attributes {
  model: typeof Model;

  constructor(model: typeof Model) {
    this.model = model;
  }
}
