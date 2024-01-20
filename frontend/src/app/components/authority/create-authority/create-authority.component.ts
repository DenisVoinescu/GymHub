import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Authority} from "../../../common/Authority";
import {AuthorityService} from "../service/authority.service";

@Component({
  selector: 'app-create-authority',
  templateUrl: './create-authority.component.html',
  styleUrl: './create-authority.component.css'
})
export class CreateAuthorityComponent {
  authority: Authority = new Authority();
  ngOnInit(): void {
  }
  constructor(private authorityService: AuthorityService, private router: Router) {
  }
  saveAuthority(){
    this.authorityService.createAuthority(this.authority).subscribe( data =>{
        console.log(data);
        this.goToReadAuthority();
      },
      error => console.log(error));
  }

  goToReadAuthority(){
    this.router.navigate(['/admin/authority/read']);
  }

  onSubmit(){
    console.log(this.authority);
    this.saveAuthority();
  }
}
