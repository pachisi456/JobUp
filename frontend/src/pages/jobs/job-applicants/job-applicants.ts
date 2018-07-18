import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ShortprofilePage} from "../../profile/shortprofile/shortprofile";
import {JobProvider} from "../../../providers/job/job";
import {userTemplate} from "../../../providers/user/userTemplate";
import {UserProvider} from "../../../providers/user/user";
import {jobTemplate} from "../../../providers/job/jobTemplate";

/**
 * Generated class for the JobApplicantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-applicants',
  templateUrl: 'job-applicants.html',
})
export class JobApplicantsPage {

  //passed by parent object
  passedJob: jobTemplate;
  jobApplicants = [];
  jobWorker: String = "0";

  /**
   * Contructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {JobProvider} _jobProv
   * @param {UserProvider} _userProv
   * @param {ToastController} _toast
   */
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _jobProv: JobProvider, private _userProv: UserProvider,
              private _toast: ToastController) {
    this.passedJob = this.navParams.get("passedJob");
  }

  /**
   * Execute on loading
   */
  ionViewDidLoad() {
    //get job applicants
    //get job first
    this._jobProv.getJob({_id: this.passedJob._id}).subscribe(
      data1 => {
        let tempJob = data1[0] as jobTemplate;
        if (tempJob.jobWorker) this.jobWorker = tempJob.jobWorker;
        //check if workers are tempted
        if (tempJob.jobTemptedWorkers.length < 1 ){
          this._toast.create({message: "Keine Interessenten", duration: 2000, position: 'top'}).present();
        } else {
          //get all tempted workers by iterating over array
          for (let userId of tempJob.jobTemptedWorkers) {
            //Check if employer rejected the tepted worker
            if (!tempJob.jobDeclinedWorkers.find(element => {
              return element == userId;
            })) {
              let readUser: userTemplate = {_id: userId};
              //get contrete user
              this._userProv.getUser(readUser).subscribe(
                data2 => {
                  this.jobApplicants.push(data2[0] as userTemplate)
                }
              )
            }
          }
        }
      }
    );
  }

  //Navigation
  goToProfile(jobApplicant) {
    this.navCtrl.push(ShortprofilePage, {
      shortUser: jobApplicant, passedJob: this.passedJob, callback: this.popView})
  }

  popView = data => {
    return new Promise((resolve, reject) => {
      this.navCtrl.pop();
      resolve();
    })
  }
}
