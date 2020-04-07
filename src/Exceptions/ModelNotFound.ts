export class ModelNotFound extends Error {
  constructor(message: any) {
    super(message);

    this.name = 'ModelNotFoundException';
    this.message = message;
  }
}
