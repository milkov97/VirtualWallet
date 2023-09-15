export class HTTPException extends Error {
  status_code: number;
  detail: string;
  headers: { [key: string]: string };

  constructor(
    status_code: number,
    detail: string,
    headers: { [key: string]: string }
  ) {
    super(detail);
    this.name = "HTTPException";
    this.status_code = status_code;
    this.detail = detail;
    this.headers = headers;
  }
}
