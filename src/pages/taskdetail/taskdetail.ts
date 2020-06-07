import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator';
import { Store } from '@ngrx/store'
import Parse from 'parse';

/**
 * Generated class for the TaskdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  defaultHistory:['TasklistPage']
})
@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html',
})
export class TaskdetailPage {
  displayinfo: any;
  object: any;
  username: any;
  taskref: any;
  depot: string;
  stop: any=[];
  destination: string;
  distance:string;
  time:string;
  instruction:string;
  task:string;
  date:string;
  service: any;
  number:string;
  vehicletype:string;
  vehicleid:string;
  complete:string;
  Checkvalue: boolean;
  Updatevalue: boolean;
  route:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private LaunchNavigator: LaunchNavigator, private store: Store<any>) {
    // let detailref  = this.navParams.get("data");
    // this.displayinfo = detailref.username;
    // this.taskref=detailref.object;
    // console.log('displayinfo: '+this.displayinfo+" detail: "+ detailref.object);

    // this.stop =detailref.stop;
    // this.destination=detailref.destination;
    // this.distance=detailref.distance;
    // this.time=detailref.time;
    // this.service=detailref.service;
    // this.date=detailref.date;
    // this.complete=detailref.complete;
    // this.vehicletype=detailref.vehicletype;
    // this.vehicleid=detailref.vehicleid;
    // this.task=detailref.task;
    // this.number=detailref.number;
    // this.instruction=detailref.instruction;
    // this.instruction= "West Brompton, UK";
    this.store.select('appReducer').subscribe(state => {
      this.object = state.task_detail.object
      this.stop=state.task_detail.stop
      this.destination=state.task_detail.destination
      this.distance=state.task_detail.distance
      this.time=state.task_detail.time
      this.service=state.task_detail.service
      this.date=state.task_detail.date
      this.complete=state.task_detail.complete
      this.vehicletype=state.task_detail.vehicletype
      this.vehicleid=state.task_detail.vehicleid
      this.task=state.task_detail.task
      this.number=state.task_detail.number
      this.instruction=state.task_detail.instruction
      // console.log('object',this.object);
    });

    if(this.complete=="Yes"){
      this.Checkvalue=true;
    }else{
      this.Checkvalue=false;
    }
  }
  openTask(){
    this.navCtrl.push('TaskPage');
  }

  updateCheck(){
    let Tasks = Parse.Object.extend('Task');
    let tasks = new Parse.Query(Tasks);
    tasks.get(this.object)
    .then((player)=>{
      if(this.Checkvalue==true){
        player.set('Complete',"Yes");
        console.log('yes');
      }else{
        player.set('Complete',"No");
        console.log('no');
      }
    player.save();

    this.store.dispatch({
      type:"UpdateComplete",
      payload:{
        object:this.object,
        complete:this.complete
      }
    })
    console.log('check complete:'+player.get('Complete'))
    });
  }
  // goTasklist(){
  //   // let Tasks = Parse.Object.extend('Task')
  //   // let tasks = new Parse.Query(Tasks);
  //   // var taskinfo = [];
  //   // tasks.equalTo("Username", this.username);
  //   // const results = await tasks.find();
  //   // for (let i = 0; i < results.length; i++) {
  //   //   var object = results[i];
  //   //   console.log(object.id);
  //   //   var info ={
  //   //     username: object.get('Username'),
  //   //     stop    : object.get('StopPoint'),
  //   //     destination:  object.get('Destination'),
  //   //     distance: object.get('Distance'),
  //   //     time    : object.get('EstimatedTime'),
  //   //     service : object.get('ServiceType'),
  //   //     number  : object.get('ReferenceNumber'),
  //   //     date    : object.get('Date'),
  //   //     complete: object.get('Complete'),
  //   //     vehicletype : object.get('VehicleType'),
  //   //     vehicleid :object.get('VehicleID'),
  //   //     task    : object.get('TaskType'),
  //   //     instruction: object.get('Instruction'),
  //   //     object  :    object.id
  //   //   };
  //   //   taskinfo.push(info);
  //   // }
  //   this.navCtrl.push('TasklistPage');
  // }

  navigate(){
    let options: LaunchNavigatorOptions = {
      start: this.depot
    };
    var x = this.stop[0];
    for(var i=1;i<this.stop.length;i++){
      x = x + "+to:"+this.stop[i];
    }
    x += "+to:"+this.destination;
    //console.log(this.startpoint,this.destination);
    this.LaunchNavigator.navigate(x, options)
        .then(
            success => alert('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailPage');
  }

}
