import { ShoppingCart } from '../shared/models/shopping-cart';
import { Order } from '../shared/models/order';
import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping: {[key: string]: string} = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {}

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
