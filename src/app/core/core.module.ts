import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PagerComponent } from '../shared/components/pager/pager.component';

@NgModule({
  declarations: [NavBarComponent,PagerComponent],
  imports: [RouterLink, RouterLinkActive, CommonModule],
  exports: [NavBarComponent,PagerComponent],
})
export class CoreModule {}
