import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Kardex } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class KardexService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Kardex>>(backUrl + 'Kardex')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Kardex>>(backUrl + 'Kardex', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Kardex>>(backUrl + 'Kardex', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Kardex>>(backUrl + 'Kardex/' + dato)
  }

 
}
