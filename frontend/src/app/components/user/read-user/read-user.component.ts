import { Component } from '@angular/core';

import {User} from "../../../common/User";
import {UserService} from "../service/user.service";


@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent {
  users: User[];


  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers() ;
  }

  extendMembership(user: User, days: number) {
    const userId = user.id;

    const confirmation = window.confirm(`Do you want to add ${days} days to ${user.username}'s membership?`);

    if (confirmation) {
      this.userService.extendMembership(userId, days).subscribe(
        updatedUser => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
            this.users.sort((a, b) => a.id - b.id);
          }
          window.alert(`Added ${days} days to the membership of ${user.username}!`);
          this.loadUsers();
        },
        error => {
          console.error('Error extending membership:', error);
        }
      );
    }

  }







  loadUsers() {
    this.userService.getUsersList().subscribe(
      data => {
        this.users = data;
      }
    );
  }


}
