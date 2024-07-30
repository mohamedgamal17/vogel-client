import { HttpParams } from "@angular/common/http";

export function createHttpParams(params: any) {
  let httpParams = new HttpParams();
  if (params) {
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.append(key, params[key].toString());
      }
    }
  }

  return httpParams;
}