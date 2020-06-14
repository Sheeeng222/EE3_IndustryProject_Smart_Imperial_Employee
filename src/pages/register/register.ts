import { Component} from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams } from 'ionic-angular';
import Parse from 'parse';

@IonicPage({
  defaultHistory:['LoginPage']
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  firstname: string;
  lastname: string;
  username:string;
  password:string;
  title:string;
  phone: string;
  email: string;
  gender: string;
  service: string;
  ID: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,) {}
  selectedTitle(event) {
    this.title =event.value
  }
  selectedGender(event) {
    this.gender =event.value
  }
  selectedService(event) {
    this.service =event.value
  }
  async register(event){
    let query = new Parse.Query('User');
    query.equalTo("username", this.username);
    const results = await query.find();
    if (results.length>0){
      for (let i = 0; i < results.length; i++) {
        var object = results[i];
        alert(object.get('username') + ' is existed please choose a new username!');
        //this.navCtrl.setRoot('RegisterPage');
      }
    }else if((this.firstname ==null)||(this.lastname ==null)||(this.username ==null)||(this.password ==null)){
      alert('Please register your full name, username and password!');
      //this.navCtrl.setRoot('RegisterPage');
    }else{
      const User = Parse.Object.extend("User");
      const user = new User();
      user.set("username", this.username);
      user.set("password", this.password);
      user.set("Department","Employee");
      user.save();
      const Employees = Parse.Object.extend("Employees");
      const employees = new Employees();
      employees.set("Title", this.title);
      employees.set("FirstName", this.firstname);
      employees.set("LastName", this.lastname);
      employees.set("Username", this.username);
      employees.set("Password", this.password);
      employees.set("Gender", this.gender);
      employees.set("PhoneNumber", this.phone);
      employees.set("EmailAddress", this.email);
      employees.set("EmployeeID", this.ID);
      // employees.set("ServiceDepartment", this.service);
      employees.save()
      .then((player) => {
        // Success
        alert('New employee is registered successfully: ' + this.username);
        this.toastCtrl.create({
             message: 'Account created successfully',
             duration: 2000
           })
        this.title = '';
        this.firstname = '';
        this.lastname = '';
        this.username = '';
        this.password = ' ';
        this.gender = '';
        this.phone = '';
        this.email = '';
        this.ID = '';
        // this.service = '';
      }, (error) => {
        // Save fails
        alert('Failed to create new object, with error code: ' + error.message);
      });
      this.navCtrl.setRoot('LoginPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
