import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Stock} from "../../../common/Stock";
import {map, mergeMap, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl: string = 'http://localhost:8080/api/stocks';

  constructor(private httpClient: HttpClient) { }

  getStockByItemId(itemId: number): Observable<Stock[]> {
    return this.httpClient.get<GetResponse>(`${this.baseUrl}/search/findByItemId?itemId=${itemId}`).pipe(
      map(response => response._embedded.stocks),
      tap(stocks => stocks.sort((a, b) => a.id - b.id))
    );
  }

  updateStockQuantity(stockId: number, newQuantity: number): Observable<Stock> {
    return this.httpClient.get<Stock>(`${this.baseUrl}/${stockId}`).pipe(
      mergeMap(stock => {
        stock.quantity = newQuantity;
        return this.httpClient.put<Stock>(`${this.baseUrl}/${stockId}`, stock);
      })
    );
  }
  createStock(stock: Stock): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}`, stock);
  }

  deleteStockById(id: number): Observable<Stock> {
    return this.httpClient.delete<Stock>(`${this.baseUrl}/${id}`);
  }

}

interface GetResponse {
  _embedded: {
    stocks: Stock[];
  }
}

