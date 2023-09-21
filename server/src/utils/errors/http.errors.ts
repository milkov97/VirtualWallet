export class HTTPException extends Error {
  statusCode: number;
  detail: string;
  headers: { [key: string]: string };

  constructor(
    statusCode: number,
    detail: string,
    headers: { [key: string]: string }
  ) {
    super(detail);
    this.name = "HTTPException";
    this.statusCode = statusCode;
    this.detail = detail;
    this.headers = headers;
  }
}
