import { Component } from '@angular/core';
import {Item} from "../../../common/Item";
import {ItemService} from "../service/item.service";

@Component({
  selector: 'app-item',
  templateUrl: './read-item-component.html',
  styleUrl: './read-item-component.css'
})
export class ReadItemComponent {
items: Item[];

constructor(private itemService: ItemService) {
}
  ngOnInit() {
  this.loadItems();
  }
  loadItems() {
    this.itemService.getItemList().subscribe(
      data => {
        this.items = data;
      },
      error => {
        console.error('Error loading items:', error);
        // Handle error if necessary
      }
    );
  }
}
