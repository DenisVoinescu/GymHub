import { Component } from '@angular/core';
import {Item} from "../../../common/Item";
import {ItemService} from "../service/item.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.css'
})
export class DeleteItemComponent {
  item: Item = new Item();

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Extract the 'id' parameter from the route
    this.route.params.subscribe(params => {
      const itemId = +params['id'];

      if (!isNaN(itemId)) {
        this.item.id = itemId;
        console.log('Valid item ID:', itemId);
      } else {
        console.log('Invalid item ID:', params['id']);
      }
    });
  }

  onSubmit() {
    // Check if the item ID is a valid number
    const itemId = +this.item.id;

    if (isNaN(itemId)) {
      console.log('Invalid item ID:', this.item.id);
      return;
    }

    // Delete the item
    this.itemService.deleteItemById(itemId).subscribe(
      () => {
        this.goToReadItem();
      },
      error => {
        console.log('Error deleting item:', error);
      }
    );
  }

  goToReadItem() {
    this.router.navigate(['admin/item/read']);
  }
}
