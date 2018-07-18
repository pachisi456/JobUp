import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {TabsPage} from "../tabs/tabs";
import {UserProvider} from "../../providers/user/user";
import {userTemplate} from "../../providers/user/userTemplate";
import {SignupPage} from "../signup/signup";
import {JobProvider} from "../../providers/job/job";
import {FormControl, Validators} from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Formcontrol
  private inputUsername;
  private inputPassword;
  public loginForm: any;
  public backgroundImage = 'assets/imgs/background-5.jpg';
  userNameControl = new FormControl('', Validators.required);
  userPasswordControl = new FormControl('', Validators.required);

  constructor(public navCtrl: NavController, public navParams: NavParams, private faio: FingerprintAIO,
              private _userProv: UserProvider, private _jobProv: JobProvider,
              private toast: ToastController) {
  }

  ionViewDidLoad() {
  }

  /**
   * Login with fingerprint (currently not working)
   */
  loginID(){
    this.faio.show({
      clientId: 'fingerprint-login',
      clientSecret: 'password',
      localizedFallbackTitle: 'Enter Passcode',
      localizedReason: 'Log in with Touch ID'
    })
      .then(result => {
        let tempUser: userTemplate = {userName: this.inputUsername};
        this._userProv.getUser(tempUser).subscribe(
          data => {
            this.navCtrl.setRoot(TabsPage);
          }, err => {
            this.toast.create(
              {message: "Authentifizierungsproblem"}
            ).present();
        }
      )})
      .catch(err => {
        console.log('Err: ', err);
      })
  }

  /**
   *log in using username and password
   */
  loginUser(){
    //Define username password combination to look up
    let tempUser: userTemplate = {userName: this.inputUsername, password: this.inputPassword};
    //Look up username and password
    this._userProv.getUser(tempUser).subscribe(
      data => {
        tempUser = data as userTemplate;
        if(tempUser[0]){ //if correct username password combination
          this._userProv.activeUser = data[0] as userTemplate;
          this.navCtrl.setRoot(TabsPage);
        } else { //no entry found
          this.toast.create(
            {message: "Falscher Benutzername oder Passwort", duration: 2000}
          ).present();
        }
      }, err => { //no connection
        this.toast.create({message:"Datenbank- oder CORS-fehler", duration: 3000}).present();
    }
    );
  }

  //Navigation
  signup(){
    this.navCtrl.push(SignupPage);
  }
}
