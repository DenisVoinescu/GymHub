import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, mergeMap, Observable, of, tap, throwError} from "rxjs";
import {User} from "../../../common/User";
import {Item} from "../../../common/Item";
import {Stock} from "../../../common/Stock";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/api/items';
  getItemList(): Observable<Item[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.items),
      tap(items => items.sort((a, b) => a.id - b.id)) // Sort the items by ID
    );
  }
  createItem(item: Item): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, item);
  }
  getItemById(id: number): Observable<Item>{
    return this.httpClient.get<Item>(`${this.baseUrl}/${id}`);
  }
  deleteItemById(id: number): Observable<Item> {
    return this.httpClient.delete<Item>(`${this.baseUrl}/${id}`);
  }
  updateItem(id: number, item: Item): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, item);
  }
  getNumberOfItems(): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/api/items/count`).pipe(
      catchError(error => {
        console.error('Error fetching items data:', error);
        return of(0);
      })
    );
  }

  getSizesForItem(itemId: number): Observable<number[]> {
    let apiUrl = 'http://localhost:8080/api';
    return this.httpClient.get<number[]>(`${apiUrl}/stocks/sizes/${itemId}`);
  }
  decrementQuantity(itemId: number, sizeId: number): Observable<number> {
    const apiUrl = 'http://localhost:8080/api';
    return this.httpClient.get<number>(`${apiUrl}/stocks/decrementQuantity/${itemId}/${sizeId}`, {});
  }





}
interface GetResponse {
  _embedded: {
    items: Item[];
  }
}
