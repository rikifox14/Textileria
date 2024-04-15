import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pedidos } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Pedidos>>(backUrl + 'Pedidos')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Pedidos>>(backUrl + 'Pedidos', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Pedidos>>(backUrl + 'Pedidos', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Pedidos>>(backUrl + 'Pedidos/' + dato)
  }

 
}
