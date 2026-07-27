import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tes2Component } from './tes2/tes2.component';
import { Tes1Component } from './tes1/tes1.component';
import { Tes3Component } from './tes3/tes3.component';
import { Tes4Component } from './tes4/tes4.component';
import { TesErrComponent } from './tes-err/tes-err.component';
import { Tes2ContainerComponent } from './tes2-container/tes2-container.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from "../app-routing.module";



@NgModule({
  declarations: [
    Tes2Component,
    Tes1Component,
    Tes3Component,
    Tes4Component,
    TesErrComponent,
    Tes2ContainerComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    
]
})
export class Test2Module { }
