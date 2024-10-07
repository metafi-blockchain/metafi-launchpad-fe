export class RequestError extends Error {
  constructor(message, code,  data) {
    super(message);
  }
}
