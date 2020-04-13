export class ValidationFailed extends Error {
  constructor(message: any) {
    super(message);

    this.name = 'ValidationFailedException';
    this.message = message;
  }
}
