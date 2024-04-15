import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SalidaDocumento } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class SalidaDocumentoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<SalidaDocumento>>(backUrl + 'SalidaDocumento')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<SalidaDocumento>>(backUrl + 'SalidaDocumento', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<SalidaDocumento>>(backUrl + 'SalidaDocumento', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<SalidaDocumento>>(backUrl + 'SalidaDocumento/' + dato)
  }

 
}

