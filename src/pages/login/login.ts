import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import Parse from 'parse';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  password:string;
  info:any;
  constructor(  public navCtrl: NavController,public toastCtrl: ToastController,) {
  }

  signUp() {
    this.navCtrl.push('RegisterPage')

  }

  signIn() {
      Parse.User.logIn(this.username, this.password,{}).then((resp) => {
        if( resp.get("Department")=="Employee"){
          this.navCtrl.setRoot('HomePage');
        }
        else{
          Parse.User.logOut().then((resp) => {
            alert("You are not an employee!");

            // this.navCtrl.setRoot('LoginPage');
          }, err => {
            console.log('Error logging out', err);

            this.toastCtrl.create({
              message: 'Error logging out',
              duration: 2000
            }).present();
          })
        }
        console.log('Logged in successfully', resp.get("Department"));
        // If you app has Tabs, set root to TabsPage
        // var info = this.username;

      }, err => {
        console.log('Error logging in', err);

        this.toastCtrl.create({
          message: err.message,
          duration: 2000
        }).present();
      });

    const LoginHistory = Parse.Object.extend("LoginHistory");
    const history = new LoginHistory();
    history.set("Username", this.username);
    history.save();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
