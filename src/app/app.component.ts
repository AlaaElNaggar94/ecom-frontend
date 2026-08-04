import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasketService } from './features/components/basket/basket.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecom-frontend';
   constructor(private spinner: NgxSpinnerService,private basketService: BasketService,
    @Inject(PLATFORM_ID) private platformId: Object
   ) {}

  ngOnInit() {
    // /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 2000);

 // التأكد من أن التنفيذ يتم داخل المتصفح فقط وليس على السيرفر
    if (isPlatformBrowser(this.platformId)) {
      const basketId = localStorage.getItem('basket_id');
      if (basketId) {
        this.basketService.getBasket(basketId).subscribe();
      }
    }
  }
}