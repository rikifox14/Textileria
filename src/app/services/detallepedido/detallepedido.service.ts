import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DetallePedido } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<DetallePedido>>(backUrl + 'DetallePedido')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<DetallePedido>>(backUrl + 'DetallePedido', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<DetallePedido>>(backUrl + 'DetallePedido', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<DetallePedido>>(backUrl + 'DetallePedido/' + dato)
  }

 
}
