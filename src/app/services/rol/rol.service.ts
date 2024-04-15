import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Rol } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Rol>>(backUrl + 'Rol')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Rol>>(backUrl + 'Rol', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Rol>>(backUrl + 'Rol', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Rol>>(backUrl + 'Rol/' + dato)
  }

 
}
