import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// قم باستيراد المكونات الخاصة بك هنا (عدّل المسارات حسب مشروعك)
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

// استيراد الحارس لحماية المسارات التي تتطلب تسجيل دخول

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'activate-account', component: ActivateAccountComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      // مسار محمي ينبغي ألا يدخله إلا المستخدم المسجل
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityRoutingModule {}
