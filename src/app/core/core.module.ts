import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PagerComponent } from './components/pager/pager.component';
import { ImageZoomComponent } from './components/image-zoom/image-zoom.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NavBarComponent, PagerComponent, ImageZoomComponent],
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    BrowserAnimationsModule,

    NgxImageZoomModule, // 👈 إضافة NgxImageZoomModule هنا وليس NgxImageZoomComponent
  ],
  exports: [NavBarComponent, PagerComponent, ImageZoomComponent],
})
export class CoreModule {}
