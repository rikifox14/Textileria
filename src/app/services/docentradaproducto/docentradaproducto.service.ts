import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DocEntradaProducto } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DocEntradaProductoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<DocEntradaProducto>>(backUrl + 'DocEntradaProducto')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<DocEntradaProducto>>(backUrl + 'DocEntradaProducto', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<DocEntradaProducto>>(backUrl + 'DocEntradaProducto', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<DocEntradaProducto>>(backUrl + 'DocEntradaProducto/' + dato)
  }

 
}
