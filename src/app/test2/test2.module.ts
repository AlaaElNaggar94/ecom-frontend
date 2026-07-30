import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tes2Component } from './tes2/tes2.component';
import { Tes1Component } from './tes1/tes1.component';
import { Tes3Component } from './tes3/tes3.component';
import { Tes4Component } from './tes4/tes4.component';
import { TesErrComponent } from './tes-err/tes-err.component';
import { Tes2ContainerComponent } from './tes2-container/tes2-container.component';
import { CoreModule } from '../core/core.module';
import { Test2RoutingModule } from './test2-routing.module';
import { Tes5Component } from './tes5/tes5.component';
import { Tes6Component } from './tes6/tes6.component';
import { Tes7Component } from './tes7/tes7.component';
import { Tes8Component } from './tes8/tes8.component';



@NgModule({
  declarations: [
    Tes2Component,
    Tes1Component,
    Tes3Component,
    Tes4Component,
    TesErrComponent,
    Tes2ContainerComponent,
    Tes5Component,
    Tes6Component,
    Tes7Component,
    Tes8Component
  ],
  imports: [
    CoreModule,
    CommonModule,
    Test2RoutingModule
    
]
})
export class Test2Module { }
