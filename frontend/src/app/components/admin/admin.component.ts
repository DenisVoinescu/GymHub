import { Component } from '@angular/core';
import { UserService } from "../user/service/user.service";
import { map, catchError, finalize } from "rxjs/operators";
import { Observable, of } from "rxjs";
import {ItemService} from "../item/service/item.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Fix the typo in styleUrls
})
export class AdminComponent {
  numOfUsers: Observable<number>;
  numOfAdmins: number;
  numOfItems: number;


  constructor(protected userService: UserService, private itemService: ItemService) {}
  ngOnInit() {
    this.numOfUsers = this.userService.getUsersList().pipe(
      map(usersList => {
        console.log('Users List:', usersList);
        return usersList.length;
      }),
      catchError(error => {
        console.error('Error fetching user data:', error);
        return of(0); // Return a default value in case of an error
      }),
      finalize(() => console.log('Data fetched successfully!'))
    );

    this.numOfUsers.subscribe();
    this.userService.getNumberOfAdmins().subscribe(
      numOfAdmins => {
        console.log('Number of Admins:', numOfAdmins);
        this.numOfAdmins = numOfAdmins;
      },
      error => {
        console.error('Error fetching admin data:', error);
        this.numOfAdmins = 0;
      }
    );
    this.itemService.getNumberOfItems().subscribe(
      numOfItems => {
        console.log('Number of Items:', numOfItems);
        this.numOfItems = numOfItems;
      },
      error => {
        console.error('Error fetching item data:', error);
        this.numOfItems = 0;
      }
    );

  }


  protected readonly UserService = UserService;
}
