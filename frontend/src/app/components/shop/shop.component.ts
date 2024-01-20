import { Component, OnInit } from '@angular/core';
import { ItemService } from "../item/service/item.service";
import { Item } from "../../common/Item";
import {forkJoin} from "rxjs";
import {UserService} from "../user/service/user.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  items: Item[];
  categories: string[] = [];
  selectedCategory: string = '';
  groupedItems: { name: string, items: Item[] }[] = [];
  selectedItemSizes: { [itemId: number]: string[] } = {};
  selectedItemSize: string = '';
  sizeMapByLetter: { [key: string]: number } = {};
  availableSizes: string[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];



  constructor(private itemService: ItemService, private userService: UserService) {
    this.initializeSizeMap();

  }



  ngOnInit() {
    this.loadItems();
  }


  loadItems() {
    this.itemService.getItemList().subscribe(
      data => {
        this.items = data;
        this.extractCategories();
        this.loadSizesForItems();
      },
      error => {
        console.error('Error loading items:', error);
      }
    );
  }

  loadSizesForItems() {
    const sizeObservables = this.items.map(item =>
      this.loadSizesForItem(item)
    );

    forkJoin(sizeObservables).subscribe(
      sizesArray => {
        sizesArray.forEach((sizes, index) => {
          const item = this.items[index];
          const sizeMapping = sizes.map(stock => this.sizeMapping[stock]);
          this.selectedItemSizes[item.id] = sizeMapping;
        });

        this.items = this.items.filter(item => this.selectedItemSizes[item.id]?.length > 0);

        this.groupItems();
      },
      error => {
        console.error('Error loading sizes:', error);
      }
    );
  }
  private initializeSizeMap(): void {
    this.sizeMapByLetter['XS'] = 1;
    this.sizeMapByLetter['S'] = 2;
    this.sizeMapByLetter['M'] = 3;
    this.sizeMapByLetter['L'] = 4;
    this.sizeMapByLetter['XL'] = 5;
    this.sizeMapByLetter['2XL'] = 6;
  }

  sellItem(itemId: number): void {
    const selectedSizes: string[] = this.selectedItemSizes[itemId];

    if (selectedSizes && selectedSizes.length > 0) {
      // The default selected size is the first on in the array of sizes
      const selectedSize: string = selectedSizes[0];

      const sizeId: number | undefined = this.sizeMapByLetter[selectedSize];

      // Check if sizeId exists in the map
      if (sizeId !== undefined) {
        const confirmMessage = `Are you sure you want to sell this item?`; // Replace with the actual price or logic to fetch the price
        const userConfirmed = confirm(confirmMessage);

        if (userConfirmed) {
          this.itemService.decrementQuantity(itemId, sizeId).subscribe(
            (newQuantity: number) => {
              console.log(`Quantity decremented successfully. New quantity: ${newQuantity}`);

              // Fetch the price of the sold item from ItemService
              this.itemService.getItemById(itemId).subscribe(
                (item) => {
                  const soldItemPrice: number = item.price;

                  // Update total revenue
                  this.userService.updateTotalRevenue(soldItemPrice);

                  window.alert(`Item sold successfully. New quantity: ${newQuantity}`);
                },
                (error) => {
                  console.error('Error fetching item details:', error);
                }
              );
            },
            (error) => {
              console.error('Error decrementing quantity:', error);
            }
          );
        } else {
          console.log('Sell item canceled by the user');
        }
      } else {
        console.error(`Invalid size: ${selectedSize}`);
      }
    }
  }
















  sizeMapping: SizeMapping = {
    1: 'XS',
    2: 'S',
    3: 'M',
    4: 'L',
    5: 'XL',
    6: '2XL',
    7: '3XL'
  };



  loadSizesForItem(item: Item) {
    return this.itemService.getSizesForItem(item.id);
  }



  extractCategories() {
    this.categories = Array.from(new Set(this.items.map(item => item.category)));
  }

  groupItems() {
    this.groupedItems = [];

    if (this.selectedCategory) {
      const itemsInSelectedCategory = this.items.filter(item => item.category === this.selectedCategory && this.selectedItemSizes[item.id] && this.selectedItemSizes[item.id].length > 0);
      this.groupedItems.push({ name: this.selectedCategory, items: itemsInSelectedCategory });
    } else {
      this.categories.forEach(category => {
        const itemsInCategory = this.items.filter(item => item.category === category && this.selectedItemSizes[item.id] && this.selectedItemSizes[item.id].length > 0);

        if (itemsInCategory.length > 0) {
          this.groupedItems.push({ name: category, items: itemsInCategory });
        }
      });
    }
  }


  onCategoryChange() {
    this.groupItems();
  }

}
interface SizeMapping {
  [key: number]: string;
}
