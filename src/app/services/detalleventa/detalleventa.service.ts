import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DetalleVenta } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<DetalleVenta>>(backUrl + 'DetalleVenta')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<DetalleVenta>>(backUrl + 'DetalleVenta', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<DetalleVenta>>(backUrl + 'DetalleVenta', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<DetalleVenta>>(backUrl + 'DetalleVenta/' + dato)
  }

 
}

