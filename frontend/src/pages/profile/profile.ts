import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {userTemplate} from "../../providers/user/userTemplate";
import {UserProvider} from "../../providers/user/user";
import {EditprofilePage} from "./editprofile/editprofile";
import {JobviewPage} from "../jobs/jobview/jobview";
import {jobTemplate} from "../../providers/job/jobTemplate";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profileImages = {
    profileImage: 'assets/imgs/avatar.png',
    coverImage: 'assets/imgs/background-5.jpg',
  };

  tempUser: userTemplate;
  user: userTemplate;

  constructor(public navCtrl: NavController, public _userProv: UserProvider, public navParam: NavParams) {
    this.user = this._userProv.activeUser;

  }

  /*
  ionViewWillEnter() {
    this._userProv.getUser(this.user).subscribe(
      data => {
        console.log(data);
       this.user = data as userTemplate;
      }, error => console.log(error)
    );
  }
   */

  editProfile(user) {
    this.navCtrl.push(EditprofilePage);
  }
}
