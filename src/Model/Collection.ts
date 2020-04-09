export class Collection {
  public data: any[] = [];

  public and: any[] = [];
  public or: any[] = [];
  public with: any[] = [];
  public has: any[] = [];
  public hasNot: any[] = [];

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
