import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Clientes } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Clientes>>(backUrl + 'Clientes')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Clientes>>(backUrl + 'Clientes', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Clientes>>(backUrl + 'Clientes', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Clientes>>(backUrl + 'Clientes/' + dato)
  }

 
}

