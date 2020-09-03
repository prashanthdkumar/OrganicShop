import { ProductService } from './product.service';
import { Product } from './models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase,
              private productService: ProductService) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$: any =  this.getItem(cartId, product.key);
    this.productService.get(product.key).valueChanges().subscribe(prodData => {
      item$.valueChanges()
      .take(1).subscribe((item: any) => {
          console.log(item);
          // if (item?.$exists()) {
          //   item$.update({ quantity: item.quantity + 1 });
          //   item$.update({ product: prodData, quantity: (item.quantity || 0) + 1 });
          // } else {
          //   item$.set({ product: prodData, quantity: 1 });
          // }
          item$.update({ product: prodData, quantity: (item?.quantity || 0) + 1 });
       });

    });
  }
}
