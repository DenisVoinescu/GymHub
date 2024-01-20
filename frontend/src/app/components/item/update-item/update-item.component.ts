import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from "../../../common/Item"; // Updated import
import { ItemService } from "../service/item.service"; // Updated import

@Component({
  selector: 'app-update-item', // Updated selector
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  id: number;
  item: Item = new Item();
  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convert id to number
      this.itemService.getItemById(this.id).subscribe(
        data => {
          this.item = data;
        },
        error => console.log(error)
      );
    });
  }

  onSubmit() {
    console.log('Before conversion - item.id:', this.item.id);
    this.item.id = +this.item.id;
    console.log('After conversion - item.id:', this.item.id);

    // Check if the item with the specified ID exists
    this.itemService.getItemById(this.item.id).subscribe(
      existingItem => {
        this.itemService.updateItem(this.item.id, this.item).subscribe(
          data => {
            this.goToAdmin();
          },
          error => console.log(error)
        );
      },
      error => {
        console.log('Item with ID does not exist. Error:', error);
      }
    );
  }

  goToAdmin() {
    this.router.navigate(['admin/item/read']);
  }
}
