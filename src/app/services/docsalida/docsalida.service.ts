import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DocSalida } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DocSalidaService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<DocSalida>>(backUrl + 'DocSalida')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<DocSalida>>(backUrl + 'DocSalida', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<DocSalida>>(backUrl + 'DocSalida', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<DocSalida>>(backUrl + 'DocSalida/' + dato)
  }

 
}
