import { Component } from '@angular/core';
import {User} from "../../../common/User";
import {UserService} from "../../user/service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Authority} from "../../../common/Authority";
import {AuthorityService} from "../service/authority.service";

@Component({
  selector: 'app-delete-authority',
  templateUrl: './delete-authority.component.html',
  styleUrl: './delete-authority.component.css'
})
export class DeleteAuthorityComponent {
  authority: Authority = new Authority();

  constructor(private authorityService: AuthorityService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Extract the 'id' parameter from the route
    this.route.params.subscribe(params => {
      const authorityId = +params['id'];

      if (!isNaN(authorityId)) {
        this.authority.id = authorityId;
        console.log('Valid authority ID:', authorityId);
      } else {
        console.log('Invalid authority ID:', params['id']);
      }
    });
  }





  onSubmit() {
    // Check if the user ID is a valid number
    const userId = +this.authority.id;

    if (isNaN(userId)) {
      console.log('Invalid user ID:', this.authority.id);
      return;
    }

    // Delete the user authority
    this.authorityService.deleteAuthorityById(userId).subscribe(
      () => {
        this.goToReadAuthority();
      },
      error => {
        console.log('Error deleting authority:', error);
      }
    );
  }



  goToReadAuthority() {
    this.router.navigate(['admin/authority/read']);
  }
}
