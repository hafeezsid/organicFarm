import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  cols:number;
  productList:Product[]=[
  new Product(10,'Chicken Breast',20,'Chicken','Fresh chicken breast','assets/images/chicken.jpg'),
  new Product(10,'Full alive fish',30,'Maangur Fish','Fresh fish from farm','assets/images/fish.jpg'),
  new Product(10,'Full alive fish',40,'Maangur Fish','Fresh fish from farm','assets/images/chicken.jpg'),
  new Product(10,'Full alive fish',50,'Maangur Fish','Fresh fish from farm','assets/images/fish.jpg')
  ];
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe( (state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
           this.cols=1;
      }
      if (state.breakpoints[Breakpoints.Small]) {
           console.log( 'Matches Small viewport');
           this.cols=2;
      }
      if (state.breakpoints[Breakpoints.Medium]) {
           console.log( 'Matches Medium  viewport');
           this.cols=2;
      }
      if (state.breakpoints[Breakpoints.Large]) {

          console.log( 'Matches Large viewport');
          this.cols=3;
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        this.cols=4;
         console.log( 'Matches XLarge viewport');   
      }
    });
  }

}
