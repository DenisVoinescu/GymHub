import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from "../../../common/User";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user: User = new User();
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.userService.getUserById(this.id).subscribe(
        data => {
          this.user = data;
        },
        error => console.log(error)
      );
    });
  }


  onSubmit() {
    console.log('Before conversion - user.id:', this.user.id);
    this.user.id = +this.user.id;
    console.log('After conversion - user.id:', this.user.id);

    // Check if the user with the specified ID exists
    this.userService.getUserById(this.user.id).subscribe(
      existingUser => {
        this.userService.updateUser(this.user.id, this.user).subscribe(
          data => {
            this.goToReadUser();
          },
          error => console.log(error)
        );
      },
      error => {
        console.log('User with ID does not exist. Error:', error);
      }
    );
  }




  goToReadUser(){
    this.router.navigate(['admin/user/read']);
  }
}
