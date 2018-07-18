import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {LoadingController, NavController, Platform, ToastController} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {SearchsettingsPage} from "./searchsettings/searchsettings";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';
import {Geolocation} from "@ionic-native/geolocation";
import {JobProvider} from "../../providers/job/job";
import {jobTemplate} from "../../providers/job/jobTemplate";
import {LocationProvider} from "../../providers/location/location";
import {UserProvider} from "../../providers/user/user";
import {SettingsProvider} from "../../providers/settings/settings";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  //card variables
  cards: jobTemplate[];
  stackConfig: StackConfig;
  recentCard: string = '';

  //geo positioning
  lat: any;
  lon: any;

  /**
   *
   * @param {NavController} navCtrl
   * @param {Http} http
   * @param {Platform} platform
   * @param {JobProvider} _jobProv
   * @param {LocationProvider} _geo
   * @param {UserProvider} _user
   * @param {SettingsProvider} _settings
   * @param {ToastController} _toast
   * @param {LoadingController} loadingCtrl
   */
  constructor(public navCtrl: NavController, private http: Http,
              private platform: Platform,
              private _jobProv: JobProvider, private _geo: LocationProvider, private _user: UserProvider,
              private _settings: SettingsProvider, private _toast: ToastController,
              public loadingCtrl: LoadingController) {
    //configure card stack
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  /**
   * What will happen, if page enters the screen
   */
  ionViewWillEnter(){
    //Update Location
    this._geo.getLocation().then(
      data => {
        this.lat = data.coords.latitude;
        this.lon = data.coords.longitude;
      }
    );

    //Do card stuff
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    //Empty cards
    this.cards = [];
    //Get new cards to display
    this.addNewCards();

  }

  /**
   * React do card being moved
   * @param element
   * @param x
   * @param y
   * @param r
   */
  onItemMove(element, x, y, r) {
    //prepare operations
    let color: String;
    let abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);
    //set card-color if moved
    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else if (x === 0){
      color = "#FFFFFF"
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  /**
   * Called whenever a card is liked or disliked
   * @param {boolean} like
   */
  voteUp(like: boolean) {
    let removedCard = this.cards.shift();
    //like or dislike job
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.jobTitle;
      //Communicate to server that joob has been liked
      this._jobProv.likeJob(this._user.activeUser._id, removedCard._id).subscribe(
        next => {
          this.addNewCards();
        }
      );
    } else {
      this.recentCard = 'You disliked: ' + removedCard.jobTitle;
      //Communicate to server that joob has been disliked
      this._jobProv.dislikeJob(this._user.activeUser._id, removedCard._id).subscribe(
        next => {
          this.addNewCards();
        }
      );
    }
  }

  /**
   * Add new cards to our array
   */
  addNewCards() {
    //get location
    this._geo.getLocation().then(
      data => {
        //get matching cards
        this._jobProv.getMatchingJobs(data.coords.latitude,data.coords.longitude, this._user.activeUser._id, this._settings.searchDistance).subscribe(
          data => {
            //transfer data into jobarray
            this.cards = data as jobTemplate[];
            if (data == []) {
              this._toast.create({message:"Keine neuen Jobs in deiner Nähe gefunden", duration: 1500}).present();
            }
          }
        );
      }
    );
  }

  //Cardstuff
  /**
   * Dunno what it do
   * @param {number} index
   * @param card
   * @returns {((control: AbstractControl) => (ValidationErrors | null)) | boolean | string | string}
   */
  trackByCards(index: number, card: any){
    return card.email;
  }

  /**
   * convert decimal to hex number
   * @param d
   * @param padding
   * @returns {string}
   */
  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
  }

  //navigation
  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

  goToSearchsettings(){
    this.navCtrl.push(SearchsettingsPage);
  }


}
