import { OrderService } from '../shared/services/order.service';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  filterOrders = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.populateMyOrders();
  }

  populateMyOrders() {
    this.authService.user$.subscribe(user => {
      this.orderService.getOrders().subscribe(orders => {
        this.filterOrders = orders.filter((order: any) => order.userId === user.uid);
      });
    });
  }

  /*
  Used nested subscribe approach to filter the order for a given userId
  This is needed only when we need to use the switchMap method in component
  populateMyOrders() {
    this.orders$ = Array.of(this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u.uid)));
    this.authService.user$.switchMap(u => {
      this.orders$ = this.orderService.getOrdersByUser(u.uid);
      return this.orders$;
    });
  }*/
}
