import { NgModule } from '@angular/core';
//import { IonicModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    //IonicModule.forChild(ResetPasswordPage),
  ],
  exports: [
    ResetPasswordPage
  ]
})
export class ResetPasswordModule {}
