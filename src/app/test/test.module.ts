import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CCartComponent } from './c-cart/c-cart.component';
import { CErrComponent } from './c-err/c-err.component';
import { CLogComponent } from './c-log/c-log.component';
import { COrdComponent } from './c-ord/c-ord.component';
import { CRegComponent } from './c-reg/c-reg.component';
import { C1Component } from './c1/c1.component';
import { C2Component } from './c2/c2.component';
import { C3Component } from './c3/c3.component';
import { C4Component } from './c4/c4.component';
import { TestRoutingModule } from './test-routing.module';
import { TestContainerComponent } from './test-container/test-container.component';
import { CoreModule } from "../core/core.module";
// import { HoComponent } from './glop/ho/ho.component';

@NgModule({
  declarations: [
    C1Component,
    C2Component,
    C3Component,
    CErrComponent,
    C4Component,
    CRegComponent,
    CCartComponent,
    CLogComponent,
    COrdComponent,
    TestContainerComponent,
    // HoComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    TestRoutingModule,
],

})
export class TestModule {}
