import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {CategoriesPage} from "./categories/categories";
import {ProfilePage} from "../profile/profile";
import {JobApplicantsPage} from "./job-applicants/job-applicants";
import {ContactdetailsPage} from "../profile/contactdetails/contactdetails";
import {JobProvider} from "../../providers/job/job";
import {jobTemplate} from "../../providers/job/jobTemplate";
import {UserProvider} from "../../providers/user/user";
import {JobviewPage} from "./jobview/jobview";
import {ShortprofilePage} from "../profile/shortprofile/shortprofile";

@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html'
})
export class JobsPage {

  //switch variable for view
  testing: string = "posted";
  //empty arrays to be filled
  postedJobs: jobTemplate[];
  acceptedJobs: any[];

  /**
   *
   * @param {NavController} navCtrl
   * @param {JobProvider} _jobProv
   * @param {UserProvider} _userProv
   * @param {ToastController} toast
   * @param {NavParams} navParams
   */
  constructor(public navCtrl: NavController, private _jobProv: JobProvider, private _userProv: UserProvider,
              private toast: ToastController, public navParams: NavParams) {


  }

  ionViewWillEnter(){
    this.getAllJobs();
  }

  /**
   * get all posted and accepted jobs
   */
  getAllJobs(){
    //Get posted jobs
    let tempJob: jobTemplate = {jobEmployer: this._userProv.activeUser._id};
    this._jobProv.getJob(tempJob).subscribe(
      data => {
        this.postedJobs = data as jobTemplate[];
        //check if jobs have been posted
        if (!this.postedJobs[0]) this.toast.create(
          {message: 'Du hast noch keine Jobs veröffentlicht', duration: 1000, position: "top"}).present();
      }, error => console.log(error)
    );
    //Get accepted Jobs
    tempJob = {jobWorker: this._userProv.activeUser._id};
    this._jobProv.getJob(tempJob).subscribe(
      data => {
        this.acceptedJobs = data as any[];
        //get jobemployer names
        this.acceptedJobs.forEach(
          element => {
            this._userProv.getUser({_id: element.jobEmployer}).subscribe(
              data => {
                element.jobEmployerFirstName = data[0].firstName;
                element.jobEmployerLastName = data[0].lastName;
              }
            )
          });
        //check if any jobs were accepted
        if (!this.acceptedJobs[0]) this.toast.create({message: 'Du hast noch keine Jobs angenommen', duration: 1000, position: "top"}).present();
      }, error => console.log(error)
    );
  }

  //Navigation
  goToJobApplicants(postedJob) {
    //check if a workes has been accepted
    if (postedJob.jobWorker === "0"){ //no worker accepted
      this.navCtrl.push(JobApplicantsPage, {
        passedJob: postedJob});
    } else { //worker accepted
      //get accepted worker
      this._userProv.getUser({_id: postedJob.jobWorker}).subscribe(
        data => {
          this.navCtrl.push(ContactdetailsPage,{
            shortUser: data[0], passedJob: postedJob, getEmployer: false
          });
        }
      )
    }
  }

  goToContactDetails(acceptedJob: jobTemplate) {
    this.navCtrl.push(ContactdetailsPage,{
      'passedJob': acceptedJob, getEmployer: true
    });
  }


  goToCategories() {
    this.navCtrl.push(CategoriesPage) ;
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  showPostedJob(postedJob){
    this.navCtrl.push(JobviewPage, {
      passedJob: postedJob})
  }

}
