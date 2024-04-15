import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Producto } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Producto>>(backUrl + 'Producto')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Producto>>(backUrl + 'Producto', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Producto>>(backUrl + 'Producto', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Producto>>(backUrl + 'Producto/' + dato)
  }

 
}
