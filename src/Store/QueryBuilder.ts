export class QueryBuilder {
  public model: any;

  public builder = {
    or: [],
    and: [],
    in: [],
  };

  public load = [];

  constructor(model: any) {
    this.model = model;
  }
}
