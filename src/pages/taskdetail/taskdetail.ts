import { ProfilePageModule } from './../profile/profile.module';
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
      this.depot = state.task_detail.depot
      this.username = state.username
      // console.log('object',this.object);
    });

    if(this.complete=="Yes"){
      this.Checkvalue=true;
    }else{
      this.Checkvalue=false;
    }
  }

  deleteTask(){

    var deletequery = Parse.Object.extend("Task");
    var deleteObj = new Parse.Query(deletequery);
    deleteObj.get(this.object, {
      success: function(yourObj) {
        // The object was retrieved successfully.
        yourObj.destroy({});
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
      }
    });
    this.store.dispatch({
      type:"DeleteTask",
      payload: {object: this.object}
    })
    this.navCtrl.pop();
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
        complete:this.Checkvalue
      }
    })
    console.log('check complete:'+player.get('Complete'))
    });
  }

  navigate(){

    var x = this.stop[0];
    for(var i=1;i<this.stop.length;i++){
      x = x + "+to:"+this.stop[i];
    }
    x += "+to:"+this.destination;
    //console.log(this.startpoint,this.destination);
    this.LaunchNavigator.navigate(x, {
      start:"51.496969,0.107444"
    }).then(
          success => alert('Launched navigator'),
          error => alert('Error launching navigator: ' + error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskdetailPage');
  }

}
