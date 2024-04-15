import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Empleado } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  constructor(private httpClient: HttpClient) { }

  getAllItems() {
    return this.httpClient.get<Array<Empleado>>(backUrl + 'Empleado')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Empleado>>(backUrl + 'Empleado', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Empleado>>(backUrl + 'Empleado', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Empleado>>(backUrl + 'Empleado/' + dato)
  }

 
}
