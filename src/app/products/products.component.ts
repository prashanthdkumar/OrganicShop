import { ShoppingCart } from '../shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Product } from '../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {}

  getProductArray(products: any): any[] {
    return products.subscribe((prod: any) => {
      // tslint:disable-next-line: forin
      for (const element in prod) {
        const value = prod[element];
        value['key'] = element;
        value['$key'] = element;
        this.products.push(value);
      }
    });
  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.products$ = this.productService.getAll();
    this.getProductArray(this.products$);

    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    this.products.filter((p: Product) => p.category === this.category) :
    this.products;
  }

}
