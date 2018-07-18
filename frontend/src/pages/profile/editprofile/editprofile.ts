import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserProvider} from "../../../providers/user/user";
import {userTemplate} from "../../../providers/user/userTemplate";

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  user : userTemplate;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _userProv: UserProvider, private toast: ToastController) {
    this.user = this._userProv.activeUser;
  }

  ionViewDidLoad() {
  }

  /**
   * update profile information
   */
  updateProfile(){
    //delete _id so it will not be corrupted; Would throw error
    delete this.user._id;
    //update user information
    this._userProv.updateUser(this.user.userName, this.user).subscribe(
      data => {
        //test success
        let tempData = data as {n: number, nModified: number, ok: number};
        this._userProv.activeUser = this._userProv.getUser({userName: this.user.userName});
        if (tempData.ok == 0) {
          this.toast.create({message: "Update fehlgeschlagen", duration: 2000}).present();
        }
        this.navCtrl.pop();
      }, err => {
        this.toast.create({message: "Update fehlgeschlagen", duration: 2000}).present();
      }
    );
  }

}
