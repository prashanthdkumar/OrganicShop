import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.orders$ = Array.of(this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u.uid)));
    // console.log(this.orders$);
    // this.authService.user$.switchMap(u => {
    //   this.orders$ = this.orderService.getOrdersByUser(u.uid);
    //   console.log('Prashanth');
    //   return this.orders$;
    // });
  }

}
