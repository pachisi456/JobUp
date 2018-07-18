import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {JobApplicantsPage} from "../../jobs/job-applicants/job-applicants";
import {UserProvider} from "../../../providers/user/user";
import {userTemplate} from "../../../providers/user/userTemplate";
import {JobProvider} from "../../../providers/job/job";
import {jobTemplate} from "../../../providers/job/jobTemplate";

/**
 * Generated class for the ShortprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shortprofile',
  templateUrl: 'shortprofile.html',
})
export class ShortprofilePage {

  profileImages = {
    profileImage: 'assets/imgs/avatar.png',
    coverImage: 'assets/imgs/background-5.jpg',
  };

  shortUser : userTemplate;
  passedJob: jobTemplate;
  callback;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _toast: ToastController,
              private _userProv: UserProvider, private _jobProv: JobProvider) {
    //setup variables
    this.shortUser = this.navParams.get('shortUser');
    this.passedJob = this.navParams.get('passedJob');
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
  }

  /**
   * Accept Worker
   */
  accept(){
    //get job to modify
    this._jobProv.getJob({_id: this.passedJob._id}).subscribe(
      data1 => {
        //alter job
        let tempJob = data1[0] as jobTemplate;
        tempJob.jobWorker = this.shortUser._id;
        let tempId = tempJob._id;
        delete tempJob._id;
        //push job
        this._jobProv.updateJob(tempId,tempJob).subscribe(
          data2 => {
            this.callback(true).then(() =>
            this.navCtrl.pop());
          }, error => {
            this._toast.create({message: "Probleme beim akzeptieren", duration: 2000}).present()
          }
        )
      }
    );
  }

  /**
   * Decline a tempted worker so he/she will not be whown again
   */
  decline(){
    //get job to modify
    this._jobProv.getJob({_id: this.passedJob._id}).subscribe(
      data1 => {
        //alter job
        let tempJob = data1[0] as jobTemplate;
        tempJob.jobDeclinedWorkers.push(this.shortUser._id);
        let tempId = tempJob._id;
        delete tempJob._id;
        //push job
        this._jobProv.updateJob(tempId,tempJob).subscribe(
          data2 => {
            this.callback(true).then(() =>
            this.navCtrl.pop());
          }, error => {
            this._toast.create({message: "Probleme beim ablehnen", duration: 2000}).present()
          }
        )
      }
    );
  }

}
