import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DocSalidaProducto } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DocSalidaProductoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<DocSalidaProducto>>(backUrl + 'DocSalidaProducto')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<DocSalidaProducto>>(backUrl + 'DocSalidaProducto', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<DocSalidaProducto>>(backUrl + 'DocSalidaProducto', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<DocSalidaProducto>>(backUrl + 'DocSalidaProducto/' + dato)
  }

 
}
