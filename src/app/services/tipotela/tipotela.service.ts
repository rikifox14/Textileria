import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TipoTela } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class TipoTelaService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<TipoTela>>(backUrl + 'TipoTela')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<TipoTela>>(backUrl + 'TipoTela', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<TipoTela>>(backUrl + 'TipoTela', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<TipoTela>>(backUrl + 'TipoTela/' + dato)
  }

 
}
