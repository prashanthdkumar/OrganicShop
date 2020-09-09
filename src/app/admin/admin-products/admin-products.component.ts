import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  filteredProducts = [];
  products =  [];
  subscription: Subscription;
  displayedColumns: string[] = ['title', 'price', 'key'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productService: ProductService) {
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter((p: Product) => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    this.doPagination();
  }

  ngOnInit(): void {
    this.subscription =  this.productService.getAll()
    .subscribe((prod: any) => {
      // tslint:disable-next-line: forin
      for (const element in prod) {
        let value = prod[element];
        value['key'] = element;
        value['$key'] = element;
        this.filteredProducts.push(value);
        this.products.push(value);
      }
      this.doPagination();
    });
  }

  doPagination() {
    this.dataSource = new MatTableDataSource<Product>(this.filteredProducts);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
