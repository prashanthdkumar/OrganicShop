import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  filteredProducts;
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      Object.values(this.products).filter((p: Product) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit(): void {
    this.subscription =  this.productService.getAll()
    .subscribe((prod: Product[]) => this.filteredProducts =  this.products = prod);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
