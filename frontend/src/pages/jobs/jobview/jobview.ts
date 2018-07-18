import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {JobProvider} from "../../../providers/job/job";
import {jobTemplate} from "../../../providers/job/jobTemplate";

/**
 * Generated class for the JobviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jobview',
  templateUrl: 'jobview.html',
})
export class JobviewPage {

  //passed by parent component
  public passedJob;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _jobProv: JobProvider, private toast: ToastController) {
    //prepare variables
    this.passedJob =  this.navParams.get("passedJob");
  }

  ionViewWillEnter() {

  }

  /**
   * Delete the selected job
   */
  deleteJob(){
    this._jobProv.deleteJob(this.passedJob._id).subscribe(
      data => {
        this.navCtrl.pop();
      }, err => {
        this.toast.create({message: "Löschen fehlgeschlagen", duration: 2000}).present();
      }
    );
  }

  /**
   * Update the job with new information
   */
  updateJob(){
    //extract _id because it is "immutable" on server
    let tempid = this.passedJob._id;
    delete this.passedJob._id;
    //tell server to update
    this._jobProv.updateJob(tempid, this.passedJob).subscribe(
      data => {
        let tempData = data as {n: number, nModified: number, Ok: number};
        //update local job so it will match servers job
        this._jobProv.getJob({_id: tempid}).subscribe(
          data => {
            this.passedJob = data as jobTemplate;
          }
        );
        //errorhandling
        if (tempData.Ok == 0) {
          this.toast.create({message: "Update fehlgeschlagen", duration: 2000}).present();
        } else {
        }
      }, err => {
        console.log(err);
        this.toast.create({message: "Update fehlgeschlagen", duration: 2000}).present();
      });
    this.navCtrl.pop();
  }

}
