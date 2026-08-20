import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../../../shared/models/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  isLoading: boolean = true;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.ordersService.getOrdersForUser().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (err:any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}