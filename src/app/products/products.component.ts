import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) {

      this.products$ = productService.getAll();
      this.getProductArray(this.products$);

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter((p: Product) => p.category === this.category) :
        this.products;
      });
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
