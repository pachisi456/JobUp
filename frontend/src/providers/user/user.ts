import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {userTemplate} from "./userTemplate";
import {userUpdateTemplate} from "./userUpdateTemplate";
import {observable} from "rxjs/symbol/observable";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  serverAdress: string = 'pachisi456.selfhost.eu:3000';
  private headers = new HttpHeaders();

  activeUser: userTemplate;

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  /**
   * In order to prevent fields from whining "cannot resolve variable bla of undefined", use this
   * Happens when a two-way-binding binds to an empty object (as in empty forms)
   */
  getEmptyUser(){
    return {_id: "0",
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: 0,
    description: '',
    occupation:'',
    jobHistoryAsEmployer: [],
    jobHistoryAsWorker: [],
    userName: '',
    password: ''}
  }

  /**
   * Create new User
   * Create a specific user:
   *    create userTemplate-Object and assign values from form-fields
   * @param {cUser} cUser containing values from form-field
   */
  createUser(cUser: userTemplate) {
    return this.http.post('http://' + this.serverAdress + '/users/create', cUser, {headers: this.headers});
  }

  /**
   * Read a user by an identifying attribute or read all users
   * read a specific user by specifying an attribute:
   *    create userTemplate-Object and assign searched attributes and values
   * read all entries:
   *    create userTemplate-Object and assign NO attributes
   * @param {userTemplate} rUser Containing seached attribute and value
   */
  getUser(rUser: userTemplate): any {
    return this.http.post('http://' + this.serverAdress + '/users/read', rUser, {headers: this.headers})
  }

  /**
   *  Update a user by identifyng per any attribute and setting any attributes
   *  Update a specific user:
   *    create a userTemplate-Object containing the new information
   * @param {number} uId ID of the User to be updated
   * @param {userTemplate} uUser Containing new Userinformation
   */
  updateUser(uuserName: String, uUser: userTemplate) {
    let searchFor: userTemplate = {userName: uuserName};
    let setTo: userTemplate = uUser;
    let completeUUser: userUpdateTemplate = {searchFor: searchFor, setTo: setTo};
    return this.http.post('http://' + this.serverAdress + '/users/update', completeUUser, {headers: this.headers})
  }


  /**
   * Delete a user by an identifying attribute or delete all users
   * !!!BE CAREFUL WITH THIS ONE!!! ASSIGNING NO ATTRIBUTES RESULTS IN DELETING ALL USERS
   * delete a specific user by specifying an attribute:
   *    create userTemplate-Object and assign searched attributes and values
   * delete all entries:
   *    create userTemplate-Object and assign NO attributes
   * @param uId ID of the user to be deleted
   */
  deleteUser(duserName: String) {
    let tempUser: userTemplate = {userName: duserName};
    return this.http.post('http://' + this.serverAdress + '/users/delete', tempUser, {headers: this.headers})
  }

  /**
   * Set active user to be used
   * @param {userTemplate} rUser
   */
  setActiveUser(rUser: userTemplate){
    this.getUser(rUser).subscribe(
      data => {
        if (data && data != []) {
          this.activeUser = data as userTemplate;
        }
      }
    )
  }
}
