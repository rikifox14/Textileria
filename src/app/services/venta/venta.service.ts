import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Venta } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Venta>>(backUrl + 'Venta')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Venta>>(backUrl + 'Venta', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Venta>>(backUrl + 'Venta', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Venta>>(backUrl + 'Venta/' + dato)
  }

 
}

