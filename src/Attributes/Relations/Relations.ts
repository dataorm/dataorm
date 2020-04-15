import { Attributes } from '../../Attributes/Attributes';

export abstract class Relations extends Attributes {
  constructor(model: any) {
    super(model);
  }

  abstract define(schema: any): any;
}
