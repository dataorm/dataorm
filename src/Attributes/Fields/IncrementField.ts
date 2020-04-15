import { Fields } from './Fields';

export class IncrementField extends Fields {
  protected value: any = null;
  protected isNullable: boolean = false;
  protected isUnique: boolean = false;

  constructor(model: any) {
    super(model);
  }

  make() {
    this.validate();
  }

  validate() {
    //
  }
}
