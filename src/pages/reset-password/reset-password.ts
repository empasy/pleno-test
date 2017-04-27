import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm;

  constructor(public authData: AuthData, public formBuilder: FormBuilder, public nav: NavController, public alertCtrl: AlertController) {

    // objeto del formulario para resetear la contraseña
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    })
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      // Si el formulario del reset de la contraseña no es válido de hace un comentario por consola
      console.log(this.resetPasswordForm.value);
    } else {
      // el formulario es válido
      this.authData.resetPassword(this.resetPasswordForm.value.email)
      .then((user) => {
        // si el usuario existe en la base de datos se le envia el correo
        let alert = this.alertCtrl.create({
          message: "Acabamos de enviarle un enlace de restablecimiento a su correo electrónico",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.nav.pop();
              }
            }
          ]
        });
        alert.present();
      }, (error) => {
        // si existe algún error no se envia el correo y muestra el error como alerta (ej: no existe el mail)
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        errorAlert.present();
      });
    }
  }
}
