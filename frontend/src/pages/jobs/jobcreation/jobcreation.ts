import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {JobProvider} from "../../../providers/job/job";
import {jobTemplate} from "../../../providers/job/jobTemplate";
import {JobsPage} from "../jobs";
import {UserProvider} from "../../../providers/user/user";
import {FormControl, Validators} from "@angular/forms";
import {LocationProvider} from "../../../providers/location/location";

/**
 * Generated class for the JobcreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobcreation',
  templateUrl: 'jobcreation.html',
})
export class JobcreationPage {
  //job template to be filled
  newJob: jobTemplate;
  public chosenCategory;

  //Formcontrols
  jobTitleControl = new FormControl('', Validators.required);
  jobDurationControl = new FormControl('', Validators.required);
  jobDescriptionControl = new FormControl('', Validators.required);
  jobSalaryControl = new FormControl('', Validators.required);


  constructor(public navCtrl: NavController, public _userProv: UserProvider,  public navParams: NavParams,
              private _jobProv: JobProvider, private _geo:LocationProvider) {
    //prepare variables
    this.chosenCategory = navParams.get('passCategory');
    this.newJob = _jobProv.getEmptyJob();
  }

  /**
   * empty
   */
  ionViewDidEnter() {
  }

  /**
   * Create new Job
   */
  createNewJob(){
    //Set extra infos
    this.newJob.jobCreationDate = new Date();
    this.newJob.jobEmployer = this._userProv.activeUser._id;
    this.newJob.jobCategory = this.chosenCategory;
    //set job-location
    this._geo.getLocation().then(
      data => {
        this.newJob.jobLat = data.coords.latitude;
        this.newJob.jobLon = data.coords.longitude;
        //tell server to create
        this._jobProv.createJob(this.newJob).subscribe(
          data => {
            this.navCtrl.setRoot(JobsPage);
          }, error1 => {
            console.log(error1)
          }
        );
      }
    );
  }
}
