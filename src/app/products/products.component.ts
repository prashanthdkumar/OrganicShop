import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  products =  [];
  categories$;

  constructor(productService: ProductService, categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
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
