export class ApiError extends Error {
  meta: any;

  constructor(error?: any) {
    super();
    this.meta = error;
  }
}
