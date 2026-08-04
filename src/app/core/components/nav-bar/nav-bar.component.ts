import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BasketService } from '../../../features/components/basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
basketCount$!: Observable<number>;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    // حسّاب إجمالي عدد القطع ديناميكيًا مع أي تغيير في السلة
    this.basketCount$ = this.basketService.basket$.pipe(
      map(basket => basket ? basket.basketItems.reduce((acc, item) => acc + item.quantity, 0) : 0)
    );
  }
}
