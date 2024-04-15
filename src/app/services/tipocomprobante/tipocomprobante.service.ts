import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TipoComprobante } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<TipoComprobante>>(backUrl + 'TipoComprobante')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<TipoComprobante>>(backUrl + 'TipoComprobante', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<TipoComprobante>>(backUrl + 'TipoComprobante', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<TipoComprobante>>(backUrl + 'TipoComprobante/' + dato)
  }
}