import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Item} from "../../../common/Item";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {
  item: Item = new Item();
  ngOnInit(): void {
  }
  constructor(private itemService: ItemService, private router: Router) {
  }
  saveItem(){
    this.itemService.createItem(this.item).subscribe(data =>{
        console.log(data);
        this.goToReadItem();
      },
      error => console.log(error));
  }

  goToReadItem(){
    this.router.navigate(['/admin/item/read']);
  }

  onSubmit(){
    console.log(this.item);
    this.saveItem();
  }

}
