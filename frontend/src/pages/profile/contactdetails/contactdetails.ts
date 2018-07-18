import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CallNumber} from "@ionic-native/call-number";
import {SMS} from '@ionic-native/sms';
import {EmailComposer} from "@ionic-native/email-composer";
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import {userTemplate} from "../../../providers/user/userTemplate";
import {UserProvider} from "../../../providers/user/user";

/**
 * Generated class for the ContactdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactdetails',
  templateUrl: 'contactdetails.html',
})
export class ContactdetailsPage {

  profileImages = {
    profileImage: 'assets/imgs/avatar.png',
    coverImage: 'assets/imgs/background-5.jpg',
  };

  user : userTemplate;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private sms: SMS,
              private emailComposer: EmailComposer, private contacts: Contacts, private _userProv: UserProvider) {
    this.user = _userProv.getEmptyUser();
    //check wether to get the employer or the employee
    if (this.navParams.get('getEmployer') === true) { //get employer
      _userProv.getUser({_id: navParams.get('passedJob').jobEmployer}).subscribe(
        data => {
          this.user = data[0] as userTemplate;
        }
      );
    } else { //get Employee
      _userProv.getUser({_id: navParams.get('shortUser')._id}).subscribe(
        data => {
          this.user = data[0] as userTemplate;
        }
      );
    }
  }

  ionViewDidLoad() {
  }

  /**
   * Start a call with the employer/employee
   */
  startCall(){
    this.callNumber.callNumber(this.user.phonenumber.toString(), true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  /**
   * Send a text message to the employer or employee
   */
  sendText(){
    let options = {
      replaceLineBreals: false,
      android: {
        intent: 'INTENT'
      }
    };
    this.sms.send(this.user.phonenumber.toString(), '', options);
  }

  /**
   * send an email to the employer or employee
   */
  sendMail() {
    let email = {
      to: this.user.email.toString(),
      cc: '',
      bcc: [''],
      attachments: [
      ],
      subject: 'Jobangebot',
      body: 'Hallo ' + this.user.firstName + ',',
      isHtml: true
    };

// Send a mail  using default options
    this.emailComposer.open(email);
  }

  /**
   * this functionality is currently not working due to ionic framework issues

  saveContact() {
    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, this.user.lastName.toString(), this.user.firstName.toString());
    contact.phoneNumbers = [new ContactField('mobile', this.user.phonenumber.toString())];
    contact.emails = [new ContactField('private', this.user.email.toString())];
    contact.save().then(
      () => console.log('Contact saved!', contact),
      (error: any) => console.error('Error saving contact.', error)
    );
  }
   */

}
