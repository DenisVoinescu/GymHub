import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, mergeMap, Observable, of, tap} from "rxjs";
import {User} from "../../../common/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static totalRevenue: number = Number(localStorage.getItem('totalRevenue')) || 0;

  private baseUrl = 'http://localhost:8080/api/users';
  constructor(private httpClient: HttpClient) { }

  getUsersList(): Observable<User[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.users),
      tap(users => users.sort((a, b) => a.id - b.id)) // Sort the users by ID
    );
  }
  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, user);
  }
  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }
  deleteUserById(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.baseUrl}/${id}`);
  }


  static getTotalRevenue(): number {
    return this.totalRevenue;
  }


  extendMembership(userId: number, days: number): Observable<User> {
    // Fetch the user by ID
    return this.httpClient.get<User>(`${this.baseUrl}/${userId}`).pipe(
      mergeMap((user) => {
        const cost = days === 30 ? 25 : days === 365 ? 200 : 0;

        // Update the membership days
        user.membershipDays += days;

        // Update the total revenue using static variable
        UserService.totalRevenue += cost;

        // Update the user in the database
        return this.httpClient.put<User>(`${this.baseUrl}/${userId}`, user).pipe(
          tap(() => {
            UserService.updateTotalRevenueInStorage();
            console.log('Total Revenue Updated in localStorage:', UserService.getTotalRevenue());
          })
        );
      })
    );
  }



  private static updateTotalRevenueInStorage(): void {
    localStorage.setItem('totalRevenue', this.totalRevenue.toString());
  }
  updateTotalRevenue(itemPrice: number): void {
    UserService.totalRevenue += itemPrice;
    UserService.updateTotalRevenueInStorage();
  }



  updateUser(id: number, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, user);
  }

  getNumberOfAdmins(): Observable<number> {
    return this.httpClient.get<number>(`http://localhost:8080/api/admins/count`).pipe(
      catchError(error => {
        console.error('Error fetching admin data:', error);
        return of(0);
      })
    );
  }


}
interface GetResponse {
  _embedded: {
    users: User[];
  }
}


