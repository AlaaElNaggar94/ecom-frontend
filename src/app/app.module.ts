import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HoComponent } from './test/glop/ho/ho.component';
import { TestModule } from './test/test.module';

@NgModule({
  declarations: [AppComponent, HoComponent],
  imports: [ CoreModule, BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
