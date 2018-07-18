import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {JobcreationPage} from "../jobcreation/jobcreation";

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  //Fixed Categories
  categories: string[] = [
    "Animal Care",
    "Child Care",
    "Cleaning Service",
    "Gardening Work",
    "Geriatric Care",
    "Groceries Shopping",
    "Household Assistance"
  ];

  /**
   * Contructor
   * @param {NavController} navCtrl
   * @param {NavParams} navParams
   */
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  //Navigation
  goToSubcategory(category){
    this.navCtrl.push(JobcreationPage, {
      passCategory: category
    })
  }

}
