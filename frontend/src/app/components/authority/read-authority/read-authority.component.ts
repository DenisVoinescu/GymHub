import { Component } from '@angular/core';
import {Authority} from "../../../common/Authority";
import {AuthorityService} from "../service/authority.service";

@Component({
  selector: 'app-read-authority',
  templateUrl: './read-authority.component.html',
  styleUrl: './read-authority.component.css'
})
export class ReadAuthorityComponent {

  authorities: Authority[];


  constructor(private authorityService: AuthorityService) {}

  ngOnInit() {
    this.listAuthorities();
  }

  listAuthorities() {
    this.authorityService.getAuthorityList().subscribe(
      data => {
        this.authorities = data;
      }
    );
  }
}
