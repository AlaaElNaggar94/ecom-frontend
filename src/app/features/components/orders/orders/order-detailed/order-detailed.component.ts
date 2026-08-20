import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder, IOrderItem } from '../../../../../shared/models/order';
import { OrdersService } from '../../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.scss'
})
export class OrderDetailedComponent implements OnInit {
  order?: IOrder;
  isLoading: boolean = true;
  baseUrl: string = 'http://localhost:4321';

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ordersService.getOrderDetailed(+id).subscribe({
        next: (order) => {
          this.order = order;
          this.isLoading = false;
        },
        error: (err:any) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}