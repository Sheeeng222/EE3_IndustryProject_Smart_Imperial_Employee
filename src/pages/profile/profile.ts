import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ModalController} from 'ionic-angular';
import Parse from 'parse';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { Store } from '@ngrx/store';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory: ['HomePage']
})
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
  service: any;
  ID: string;
  info: any;
  newinfo: any;
  data:any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private store:Store<any>) {


    this.store.select('appReducer').subscribe(state => {
      this.title=state.profile_info.Title
      this.firstname=state.profile_info.FirstName
      this.lastname=state.profile_info.LastName
      this.gender=state.profile_info.Gender
      this.password=state.profile_info.Password
      this.username=state.profile_info.Username
      this.checkusername=state.profile_info.Username
      this.service=state.profile_info.ServiceDepartment
      this.ID=state.profile_info.EmployeeID
      this.phone=state.profile_info.PhoneNumber
      this.email=state.profile_info.EmailAddress
      // console.log('username',this.username);
    });
  }

  selectedTitle(event) {
    this.title =event.value
  }
  selectedGender(event) {
    this.gender =event.value
    // console.log("gender: ", this.gender);
  }
  selectedService(event) {
    this.service =event.value
  }

  async update(event){
    if(this.username !=this.checkusername){
      alert('You cannot change your username!');
    }
    // else{
      let Employees = Parse.Object.extend('Employees');
      let employees = new Parse.Query(Employees);
      employees.equalTo("Username", this.username);
      const result = await employees.find()
      await employees.get(result[0].id)
      .then((player)=>{
        player.set('Title',this.title);
        player.set("FirstName", this.firstname);
        player.set("LastName", this.lastname);
        player.set("Password", this.password);
        player.set("Gender", this.gender);
        player.set("PhoneNumber", this.phone);
        player.set("EmailAddress", this.email);
        player.set("EmployeeID", this.ID);
        // player.set("ServiceDepartment", this.service);
        player.save();
      });

      // console.log("id in update function: ",result[0].id);
      // console.log("service in update function: ", this.service);
      alert('Your profile has been updated sucessfully!');
      this.navCtrl.setRoot('HomePage');
    // }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
