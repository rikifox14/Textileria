import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EntradaDocumento } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class EntradaDocumentoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<EntradaDocumento>>(backUrl + 'EntradaDocumento')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<EntradaDocumento>>(backUrl + 'EntradaDocumento', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<EntradaDocumento>>(backUrl + 'EntradaDocumento', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<EntradaDocumento>>(backUrl + 'EntradaDocumento/' + dato)
  }

 
}
