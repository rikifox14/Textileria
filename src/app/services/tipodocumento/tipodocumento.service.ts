import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TipoDocumento } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<TipoDocumento>>(backUrl + 'TipoDocumento')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<TipoDocumento>>(backUrl + 'TipoDocumento', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<TipoDocumento>>(backUrl + 'TipoDocumento', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<TipoDocumento>>(backUrl + 'TipoDocumento/' + dato)
  }
}
