export class Record {
  private record: any;
  private fields: { id: string; name: string };

  constructor() {
    this.fields = { id: 'integer', name: 'string' };
  }

  fill(record: any) {
    Object.keys(this.fields).forEach((key: any) => {
      if (record.hasOwnProperty(key)) {
        this.record[key] = record[key];
      }
    });

    return this.record;
  }

  save() {
    // trigger store update
    this.fill(this.record);
  }

  delete() {
    // trigger store update

    this.record = null;
  }

  toJson() {
    if (this.record === null) return null;

    return Object.keys(this.fields).reduce((carry, item) => {
      return { ...carry, ...{ [item]: this.record[item] } };
    }, {});
  }
}
