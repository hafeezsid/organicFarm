import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  productList:Product[]=[
  new Product(10,'Chicken Breast',20,'Chicken','Fresh chicken breast','assets/images/chicken.jpg'),
  new Product(10,'Full alive fish',40,'Maangur Fish','Fresh fish from farm','assets/images/fish.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
