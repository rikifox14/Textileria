import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Proveedor } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Proveedor>>(backUrl + 'Proveedor')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Proveedor>>(backUrl + 'Proveedor', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Proveedor>>(backUrl + 'Proveedor', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Proveedor>>(backUrl + 'Proveedor/' + dato)
  }

 
}
