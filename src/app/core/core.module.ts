// src/app/core/core.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PagerComponent } from './components/pager/pager.component';
import { ImageZoomComponent } from './components/image-zoom/image-zoom.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [NavBarComponent, PagerComponent, ImageZoomComponent],
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgxImageZoomModule,
  ],
  exports: [NavBarComponent, PagerComponent, ImageZoomComponent],
})
export class CoreModule {}