import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivateAccountComponent } from './activate-account/activate-account.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ActivateAccountComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IdentityRoutingModule
  ]
})
export class IdentityModule { }
