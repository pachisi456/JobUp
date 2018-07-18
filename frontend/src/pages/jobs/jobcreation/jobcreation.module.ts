import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobcreationPage } from './jobcreation';

@NgModule({
  declarations: [
    JobcreationPage,
  ],
  imports: [
    IonicPageModule.forChild(JobcreationPage),
  ],
})
export class JobcreationPageModule {}
