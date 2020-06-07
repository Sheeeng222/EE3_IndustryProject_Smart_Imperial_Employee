import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateTaskPage } from './createtask';

@NgModule({
  declarations: [
    CreateTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateTaskPage),
  ],
})
export class TaskPageModule {}
