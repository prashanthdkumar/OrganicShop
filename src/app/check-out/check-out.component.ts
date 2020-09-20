import { Order } from './../models/order';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  shipping: {[key: string]: string} = {};
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;


  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {

    const order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
  }
}
