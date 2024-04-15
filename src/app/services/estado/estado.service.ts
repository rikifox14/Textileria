import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Estado } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Estado>>(backUrl + 'Estado')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Estado>>(backUrl + 'Estado', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Estado>>(backUrl + 'Estado', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Estado>>(backUrl + 'Estado/' + dato)
  }

 
}
