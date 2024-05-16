export interface IResponse<T> {
  code: number;
  data: object | T;
  message: string;
}
