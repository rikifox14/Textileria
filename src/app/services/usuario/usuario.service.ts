import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { backUrl } from 'src/app/constants';
import { RespuestaLogin } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) { }

  postLoginUser(userData: object) {
    return this.httpClient.post<RespuestaLogin>(backUrl + 'Auth', userData)
  }
}
