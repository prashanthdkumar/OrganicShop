import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  filteredProducts;
  products;
  subscription: Subscription;
  searchText = '';

  constructor(private productService: ProductService) {
  }

  filter(query: string) {
    // console.log(query);
    this.filteredProducts = (query) ?
      Object.values(this.products).filter((p: Product) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit(): void {
    // this.products$ = this.productService.getAll();
    // this.products$.subscribe(data => {
    // this.products = data;
    // });
    this.subscription =  this.productService.getAll().subscribe(prod => this.filteredProducts =  this.products = prod);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
