import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobApplicantsPage } from './job-applicants';

@NgModule({
  declarations: [
    JobApplicantsPage,
  ],
  imports: [
    IonicPageModule.forChild(JobApplicantsPage),
  ],
})
export class JobApplicantsPageModule {}
