import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';

import { AuthData } from '../../providers/auth-data';

import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';

import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
  public loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  	// se asigna el formBuilder a la variable loginForm (objeto del formulario para validar)
    this.loginForm = formBuilder.group({
	    email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
	    password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
	  });
  }

  loginUser(){
    if (!this.loginForm.valid){
      // Si el formulario del login no es válido de hace un comentario por consola
      console.log(this.loginForm.value);
    } else {
      // formulario válido
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( 
        authData => {
          // si la autenticación con el email y la contraseña es correcta redirige al HomePage
          this.navCtrl.setRoot(HomePage);
    }, error => {
      // si existe algun error se muestra que error fue en una ventana de alerta.
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
    	});
        alert.present();
      });
    });

  	this.loading = this.loadingCtrl.create({
       dismissOnPageChange: true
  	});
  	
  	this.loading.dismiss()
  	}
  }

  // Función que lleva la navegación a la página para resetear la contraseña
  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
