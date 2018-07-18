import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SettingsProvider} from "../../../providers/settings/settings";

/**
 * Generated class for the SearchsettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchsettings',
  templateUrl: 'searchsettings.html',
})
export class SearchsettingsPage {

  searchRadius: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _settings: SettingsProvider) {
    this.searchRadius = _settings.searchDistance;
  }

  ionViewDidLoad() {
  }

  /**
   * set radius in settings provider
   */
  updateRadius(){
    this._settings.searchDistance = this.searchRadius;
  }

}
