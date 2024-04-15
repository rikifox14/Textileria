import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MetodoPago } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<MetodoPago>>(backUrl + 'MetodoPago')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<MetodoPago>>(backUrl + 'MetodoPago', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<MetodoPago>>(backUrl + 'MetodoPago', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<MetodoPago>>(backUrl + 'MetodoPago/' + dato)
  }

 
}

