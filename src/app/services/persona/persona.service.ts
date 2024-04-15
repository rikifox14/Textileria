import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Persona } from 'src/app/models';
import { backUrl } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  constructor(private httpClient: HttpClient) { }
  public apiDniUrl = 'https://dniruc.apisperu.com/api/v1/dni/'
  public tokenApi = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImkxOTIwNDkxQGNvbnRpbmVudGFsLmVkdS5wZSJ9.3wWaGD6u7MV6mcgGB-B_BE4L6SLdSlSozH5HOybSzQc'
  /* public token: string = sessionStorage.getItem('userToken')!
  public headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token}) */

  getAllItems() {
    return this.httpClient.get<Array<Persona>>(backUrl + 'Persona')
  }
  createItem(item: object) {
    return this.httpClient.post<Array<Persona>>(backUrl + 'Persona', item)
  }
  updateItem(item: object) {
    return this.httpClient.put<Array<Persona>>(backUrl + 'Persona', item)
  }
  deleteItem(dato: object) {
    return this.httpClient.delete<Array<Persona>>(backUrl + 'Persona/' + dato)
  }

  requestDniApi(dni: string) {
    return this.httpClient.get<any>(this.apiDniUrl + dni, {params:{token: this.tokenApi}})
  }
}
