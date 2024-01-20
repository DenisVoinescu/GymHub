import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from './stock.service';
import { Stock } from "../../../common/Stock";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  itemId: number;
  stocks: Stock[];
  addQuantity: number;
  updateQuantity: number;
  newSize: string;
  newQuantity: number;

  constructor(private route: ActivatedRoute, private stockService: StockService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      this.loadStocks();
    });
  }

  // addStock(stock: Stock): void {
  //   if (!isNaN(this.addQuantity) && this.addQuantity > 0) {
  //     this.stockService.addStockQuantity(stock.id, this.addQuantity).subscribe(() => {
  //       console.log('Stock quantity added.');
  //       this.loadStocks();
  //     });
  //   } else {
  //     console.error('Invalid quantity input');
  //   }
  // }

  updateStock(stock: Stock): void {
    if (!isNaN(this.updateQuantity) && this.updateQuantity >= 0) {
      this.stockService.updateStockQuantity(stock.id, this.updateQuantity).subscribe(() => {
        console.log('Stock updated.');
        this.loadStocks();
      });
    } else {
      console.error('Invalid quantity input');
    }
  }

  deleteStock(stock: Stock): void {
    this.stockService.deleteStockById(stock.id).subscribe(() => {
      console.log('Stock deleted.');
      this.loadStocks();
    });
  }

  private loadStocks(): void {
    this.stockService.getStockByItemId(this.itemId).subscribe((response) => {
      this.stocks = response;
      this.stocks.forEach(stock => {
        stock.sizeName = this.getSizeName(stock.sizeId);
      });
    });
  }
  addNewStock(): void {
    if (this.newSize && !isNaN(this.newQuantity) && this.newQuantity > 0) {
      const sizeId = this.getSizeIdByName(this.newSize);
      if (sizeId !== null) {
        const newStock: Stock = {
          id: 0, // Adjust the ID as needed based on your application logic
          sizeId: sizeId,
          quantity: this.newQuantity,
          itemId: this.itemId,
          sizeName: this.newSize,
        };

        this.stockService.createStock(newStock).subscribe(() => {
          console.log('New stock added.');
          this.loadStocks();
          // Reset form values after adding the new stock
          this.newSize = '';
          this.newQuantity = null;
        });
      } else {
        console.error('Invalid size input');
      }
    } else {
      console.error('Invalid input for new stock');
    }
  } private getSizeIdByName(sizeName: string): number | null {
    const sizeMap: { [key: number]: string } = {
      1: 'XS',
      2: 'S',
      3: 'M',
      4: 'L',
      5: 'XL',
      6: '2XL',
      7: '3XL',
    };

    const sizeIds = Object.keys(sizeMap).map(Number);
    const foundSizeId = sizeIds.find(id => sizeMap[id] === sizeName);

    return foundSizeId || null;
  }




  getSizeName(sizeId: number): string {
    const sizeMap: { [key: number]: string } = {
      1: 'XS',
      2: 'S',
      3: 'M',
      4: 'L',
      5: 'XL',
      6: '2XL',
      7: '3XL',
    };

    return sizeMap[sizeId] || 'Unknown Size';
  }
}
