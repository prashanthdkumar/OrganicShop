import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  categories =  [];
  @Input('category') category;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
    this.getCategoryArray(this.categories$);
  }

  ngOnInit(): void {
  }

  getCategoryArray(categories: any): any[] {
    return categories.subscribe((cat: any) => {
      // tslint:disable-next-line: forin
      for (const element in cat) {
        const value = cat[element];
        value['key'] = element;
        value['$key'] = element;
        value['_id'] = cat[element].name.toLowerCase();
        this.categories.push(value);
      }
    });
  }
}
