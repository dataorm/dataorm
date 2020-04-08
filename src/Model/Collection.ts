export class Collection {
  data: any[] = [];

  constructor(data: any) {
    this.data = data;
  }

  toArray() {
    console.log('converting instances to array');
  }
}
