class Query {
  first() {
    console.log('first');
  }

  find(id: any) {
    console.log(id);
  }

  get() {
    console.log('get');
  }
}

export { Query };
