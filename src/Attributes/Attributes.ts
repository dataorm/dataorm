import { Model } from '../Model/Model';

export abstract class Attributes {
  model: typeof Model;

  constructor(model: typeof Model) {
    this.model = model;
  }
}
