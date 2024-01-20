import { Component } from '@angular/core';
import {User} from "../../../common/User";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
user: User = new User();
  ngOnInit(): void {
  }
constructor(private userService: UserService, private router: Router) {
}
  saveUser(){
    this.userService.createUser(this.user).subscribe( data =>{
        console.log(data);
        this.goToReadUser();
      },
      error => console.log(error));
  }

  goToReadUser(){
    this.router.navigate(['/admin/user/read']);
  }

  onSubmit(){
    console.log(this.user);
    this.saveUser();
  }
}
