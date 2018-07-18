import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {userTemplate} from "../../providers/user/userTemplate";
import {UserProvider} from "../../providers/user/user";
import {FormControl, Validators} from "@angular/forms";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newUser: userTemplate;
  //Formccontrol
  userNameControl = new FormControl('', Validators.required);
  userPasswordControl = new FormControl('', Validators.required);
  userFirstNameControl = new FormControl('', Validators.required);
  userLastNameControl = new FormControl('', Validators.required);
  userEmailControl = new FormControl('', Validators.email);
  userPhoneControl = new FormControl('', Validators.required);
  userOccupationControl = new FormControl('', Validators.required);
  userDescriptionControl = new FormControl('', Validators.required);

  /**
   *
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   * @param {UserProvider} _userProv
   * @param {ToastController} _toastController
   */
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _userProv: UserProvider, private _toastController: ToastController) {
    //Get empty user so two way binding will work properly
    this.newUser = _userProv.getEmptyUser();
  }

  ionViewDidLoad() {
  }

  /**
   * Signup user when button clicked
   */
  signup() {
    //Check if username exists
    //define searched for element
    let userNameUser: userTemplate = {userName: this.newUser.userName};
    //search for element
    this._userProv.getUser(userNameUser).subscribe(
      data => {
        let tempUser = data[0] as userTemplate;
        if(!tempUser){ //if username is not existent
          //create user
          delete this.newUser._id;
          this._userProv.createUser(this.newUser).subscribe(
            data => {
              //save all user info
              this._userProv.activeUser = data as userTemplate;
              this.navCtrl.setRoot(TabsPage);
            }, error1 => console.log(error1)
          );
        } else { //if username is existent
          this._toastController.create({message: "Benutzername bereits vergeben", duration: 3000}).present();
        }
      }, err => {
        console.log(err)
    }
    );
  }
}
