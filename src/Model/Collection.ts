export class Collection {
  public data: any[] = [];

  public fromArray(array: any[]) {
    this.data = array;

    return this;
  }

  public toArray() {
    return this.data;
  }

  public find() {
    return this.data;
  }

  public findMany() {
    return this.data;
  }
}
