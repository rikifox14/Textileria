import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Sucursal } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Sucursal>>(backUrl + 'Sucursal')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Sucursal>>(backUrl + 'Sucursal', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Sucursal>>(backUrl + 'Sucursal', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Sucursal>>(backUrl + 'Sucursal/' + dato)
  }

 
}

