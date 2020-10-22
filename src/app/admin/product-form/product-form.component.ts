import { Product, ProductClass } from '../../shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product  = new ProductClass();
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) { return; }

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).valueChanges().take(1).subscribe((p: any) => this.product = p);
    }
  }
}
