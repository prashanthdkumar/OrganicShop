import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;
  products;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.products$.subscribe(data => {
      this.products = data;
      //console.log(this.products);
    });
  }

}
