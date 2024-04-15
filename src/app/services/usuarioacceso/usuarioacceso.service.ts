import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UsuarioAcceso } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAccesoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<UsuarioAcceso>>(backUrl + 'UsuarioAcceso')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<UsuarioAcceso>>(backUrl + 'UsuarioAcceso', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<UsuarioAcceso>>(backUrl + 'UsuarioAcceso', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<UsuarioAcceso>>(backUrl + 'UsuarioAcceso/' + dato)
  }

 
}

