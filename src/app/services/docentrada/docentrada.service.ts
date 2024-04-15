import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DocEntrada } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DocEntradaService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<DocEntrada>>(backUrl + 'DocEntrada')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<DocEntrada>>(backUrl + 'DocEntrada', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<DocEntrada>>(backUrl + 'DocEntrada', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<DocEntrada>>(backUrl + 'DocEntrada/' + dato)
  }

 
}
