import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ModalController} from 'ionic-angular';
import Parse from 'parse';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  firstname: string;
  lastname: string;
  username:string;
  checkusername: string;
  password:string;
  title:string;
  phone: string;
  email: string;
  gender: string;
  service: string;
  ID: string;
  info: any;
  newinfo: any;
  data:any;
  
  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,) {
    let data  = this.navParams.get("info");
    this.title=data[0];
    this.firstname=data[1];
    this.lastname=data[2];
    this.gender=data[3];
    this.password=data[7];
    this.username=data[6];
    this.checkusername=data[6];
    this.service=data[4];
    this.ID=data[5];
    this.phone=data[8];
    this.email=data[9];
    console.log(data);
    console.log("USERNAME: "+ this.checkusername);
  }
  selectedTitle(event) {
    this.title =event.value
  }
  selectedGender(event) {
    this.gender =event.value
  }
  selectedService(event) {
    this.service =event.value
  }
  // goHome(){
  //   var info = this.username;
  //   this.navCtrl.push('HomePage',{info});
  // }
  async update(event){
    if(this.username !=this.checkusername){
      alert('You cannot change your username!');
    }
    else{
      let Employees = Parse.Object.extend('Employees');
      let employees = new Parse.Query(Employees);
      employees.equalTo("Username", this.username);
      const result = await employees.find()
      for(let i=0;i<result.length;i++){
        console.log(result[i]);
        var object=result[i];
        console.log('object; '+ object.id);
      }
      employees.get(object.id)
      .then((player)=>{
      player.set('Title',this.title);
      player.set("FirstName", this.firstname);
      player.set("LastName", this.lastname);
      //player.set("Username", this.username);
      player.set("Password", this.password);
      player.set("Gender", this.gender);
      player.set("PhoneNumber", this.phone);
      player.set("EmailAddress", this.email);
      player.set("EmployeeID", this.ID);
      player.set("ServiceDepartment", this.service);
      player.save();
      });
      alert('Your profile has been updated sucessfully!');
      var info = this.username;
      this.navCtrl.push('HomePage',{info});
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
