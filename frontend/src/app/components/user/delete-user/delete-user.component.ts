import {Component, OnInit} from '@angular/core';
import { UserService } from "../service/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../../common/User";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{

  user: User = new User();

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];

      if (!isNaN(userId)) {
        this.user.id = userId;
        console.log('Valid user ID:', userId);
      } else {
        console.log('Invalid user ID:', params['id']);
      }
    });
  }





  onSubmit() {
    // Check if the user ID is a valid number
    const userId = +this.user.id;

    if (isNaN(userId)) {
      console.log('Invalid user ID:', this.user.id);
      return;
    }

    // Delete the user
    this.userService.deleteUserById(userId).subscribe(
      () => {
        this.goToReadUser();
      },
      error => {
        console.log('Error deleting user:', error);
      }
    );
  }



  goToReadUser() {
    this.router.navigate(['admin/user/read']);
  }
}
