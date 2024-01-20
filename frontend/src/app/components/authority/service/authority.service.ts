import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Authority} from "../../../common/Authority";

@Injectable({
  providedIn: 'root'
})

export class AuthorityService {

  private baseUrl = 'http://localhost:8080/api/authorities';
  constructor(private httpClient: HttpClient) { }


  getAuthorityList(): Observable<Authority[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.authorities));
  }
  createAuthority(authority: Authority): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, authority);
  }
  getAuthorityBy(id: number): Observable<Authority>{
    return this.httpClient.get<Authority>(`${this.baseUrl}/${id}`);
  }
  deleteAuthorityById(id: number): Observable<Authority> {
    return this.httpClient.delete<Authority>(`${this.baseUrl}/${id}`);
  }
}
interface GetResponse {
  _embedded: {
    authorities: Authority[];
  }
}
