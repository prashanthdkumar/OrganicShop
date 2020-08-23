import { Observable } from 'rxjs';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  products =  [];

  constructor(productService: ProductService) {
    this.products$ = productService.getAll();
    this.getProductArray(this.products$);
  }

  getProductArray(products: any): any[] {
    return products.subscribe((prod: any) => {
      // tslint:disable-next-line: forin
      for (const element in prod) {
        const value = prod[element];
        value['key'] = element;
        this.products.push(value);
      }
    });
  }

}
