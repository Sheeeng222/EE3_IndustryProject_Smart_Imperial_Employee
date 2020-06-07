import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator';
import Parse from 'parse';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Store } from '@ngrx/store';

/**
 * Generated class for the TasklistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory:['HomePage']
})

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html',
})
export class TasklistPage {
  username: string;
  // stop: any=[];
  // destination: string;
  // distance:string;
  // time:string;
  // instruction:string;
  // task:string;
  // date:string;
  // service: string;
  // number:string;
  // vehicleid:string;
  // complete:string;
  // taskinfo:any;
  public taskdatas: Array<any>=[];
  // data:any;
  // // displayinfo: any;
  // displayusername: string;
  // reference: string;
  // object  : string;
  //heros:any;
  //gird display initialization:

  // heros: Array <any>=[];
  // constructor(public navCtrl: NavController, public navParams: NavParams, private LaunchNavigator: LaunchNavigator) {
  //   let taskdatas  = this.navParams.get("taskinfo");
  //   this.username= taskdatas[0];
  //   console.log('TaskReceive: ' + taskdatas);
  //   this.displayinfo=this.username;

  //   for(let i=0;i<taskdatas.length;i++){
  //     this.heros.push(taskdatas[i]);
  //   }
  //   this.startpoint = "West Brompton,UK";
  //   this.destination = "Westminster, London, UK";
  //   console.log('hero: '+this.heros);

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<any>) {
    // this.taskdatas  = this.navParams.get("taskinfo");
    // this.username= this.taskdatas[0].username;
    // console.log('TaskReceive: ' + this.taskdatas);
    // this.displayinfo=this.username;
    // console.log('Reference: '+this.taskdatas[0].reference+'service: '+this.taskdatas[0].service+
    // 'Distance: '+this.taskdatas[0].distance+'Time: '+this.taskdatas[0].time);
    this.store.select('appReducer').subscribe(state => {
      this.username = state.username;
      this.taskdatas = state.task_info;
      // console.log('username',this.username);
    });

  }
  openTask(){
    // var info = this.username;
    this.navCtrl.push('CreateTaskPage');
  }
  godetail(data){
    this.store.dispatch({
      type:"TASKDETAIL",
      payload:data
    })
    this.navCtrl.push('TaskdetailPage');
  }
  // goHome(){
  //   var info=this.username;
  //   this.navCtrl.setRoot('HomePage', {info} );
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TasklistPage');
  }
}



