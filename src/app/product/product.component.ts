import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input('product') product:Product;
  aWishList:boolean;
  rWishList:boolean;
  constructor() { }

  ngOnInit(): void {
    this.toggleWishList();
  }
  toggleWishList()
  {
    
    this.aWishList=!this.aWishList;
    this.rWishList=!this.aWishList;

  }
}
