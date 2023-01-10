// https://github.com/tryber/sd-022-b-live-lectures/blob/lecture/26.3/aula_completa/src/utils/http.exception.ts
class HttpException extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default HttpException;
