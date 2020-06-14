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

  public taskdatas: Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<any>) {

    this.store.select('appReducer').subscribe(state => {
      this.username = state.username;
      this.taskdatas = state.task_info;
      this.taskdatas.sort(function(a, b) {
        var dateA:any = new Date(a.date);
        var dateB:any = new Date(b.date);
        return dateB - dateA;
      })
      // console.log('taskdatas',this.taskdatas[0].date);

    });

  }

  openTask(){
    this.navCtrl.push('CreateTaskPage');
  }

  godetail(data){
    this.store.dispatch({
      type:"TASKDETAIL",
      payload:data
    })
    this.navCtrl.push('TaskdetailPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasklistPage');
  }
}



