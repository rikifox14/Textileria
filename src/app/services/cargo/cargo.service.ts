import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cargo } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Cargo>>(backUrl + 'Cargo')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Cargo>>(backUrl + 'Cargo', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Cargo>>(backUrl + 'Cargo', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Cargo>>(backUrl + 'Cargo/' + dato)
  }

 
}
