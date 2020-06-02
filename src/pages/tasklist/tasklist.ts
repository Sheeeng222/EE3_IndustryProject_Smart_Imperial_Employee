import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import Parse from 'parse';
import { analyzeAndValidateNgModules } from '@angular/compiler';

/**
 * Generated class for the TasklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TasklistPage {
  username: string;
  stop: any=[];
  destination: string;
  distance:string;
  time:string;
  instruction:string;
  task:string;
  date:string;
  service: string;
  number:string;
  vehicleid:string;
  complete:string;
  taskinfo:any;
  public taskdatas: Array<any>=[];
  data:any;
  displayinfo: any;
  displayusername: string;
  reference: string;    
  object  : string; 
  //heros:any;
  //gird display initialization: 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.taskdatas  = this.navParams.get("taskinfo");
    this.username= this.taskdatas[0].username;
    console.log('TaskReceive: ' + this.taskdatas);
    this.displayinfo=this.username;
    console.log('Reference: '+this.taskdatas[0].reference+'service: '+this.taskdatas[0].service+
    'Distance: '+this.taskdatas[0].distance+'Time: '+this.taskdatas[0].time);
    
  }
  openTask(){
    var info = this.username;
    this.navCtrl.push('TaskPage', {info});
  }
  godetail(data){
    this.navCtrl.setRoot('TaskdetailPage', {data} );
  }
  goHome(){
    var info=this.username;
    this.navCtrl.setRoot('HomePage', {info} );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TasklistPage');
  }

}
