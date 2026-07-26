import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
  declarations: [NavBarComponent],
  imports: [RouterLink, RouterLinkActive, CommonModule],
  exports: [NavBarComponent],
})
export class CoreModule {}
