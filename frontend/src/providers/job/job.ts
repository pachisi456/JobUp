import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jobTemplate} from "./jobTemplate";
import {jobUpdateTemplate} from "./jobUpdateTemplate";
import {userTemplate} from "../user/userTemplate";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the JobProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobProvider {

  //setup network properties
  serverAdress: string = 'pachisi456.selfhost.eu:3000';
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * In order to prevent fields from whining "cannot resolve variable bla of undefined", use this
   * Happens when a two-way-binding binds to an empty object (as in empty forms)
   */
  getEmptyJob(){
    return {jobId: 0,
      jobTitle: '',
      jobCreationDate: null,
      jobDescription: [],
      jobImage: null,
      jobLon: 0,
      jobLat: 0,
      jobCategory: '',
      jobSubcategory: '',
      jobSalary: 0,
      jobDuration: '',
      jobEmployer: '0',
      jobStatus: '',
      jobTemptedWorkers: [],
      jobDeclinedWorkers: [],
      jobWorker: '0'}
  }



  /**
   * Create new Job
   * Create a specific job:
   *    create jobTemplate-Object and assign values from form-fields
   * @param {jobTemplate} cJob containing values from form-field
   */
  createJob(cJob: jobTemplate) {
    return this.http.post('http://' + this.serverAdress + '/jobs/create', cJob, {headers: this.headers})
  }

  /**
   * Read a job by an identifying attribute or read all jobs
   * read a specific job by specifying an attribute:
   *    create jobTemplate-Object and assign searched attributes and values
   * read all entries:
   *    create jobTemplate-Object and assign NO attributes
   * @param {jobTemplate} rJob Containing seached attribute and value
   */
  getJob(rJob: jobTemplate ): any {
    return this.http.post('http://' + this.serverAdress + '/jobs/read', rJob, {headers: this.headers});
  }

  /**
   *  Update a job by identifyng per any attribute and setting any attributes
   *  Update a specific job:
   *    create a jobTemplate-Object containing the new information
   * @param {number} jId ID of the Job to be updated
   * @param {jobUpdateTemplate} uJob Containing jobTemplate-Objects containing searchFor and setTo values
   */
  updateJob(jId: String,uJob: jobTemplate) {
    let searchFor: jobTemplate = {_id: jId};
    let setTo: jobTemplate = uJob;
    let comleteUJob: jobUpdateTemplate = {searchFor: searchFor, setTo:setTo};
    return this.http.post('http://' + this.serverAdress + '/jobs/update', comleteUJob, {headers: this.headers});
  }

  /**
   * Delete a job by an identifying attribute or delete all jobs
   * !!!BE CAREFUL WITH THIS ONE!!! ASSIGNING NO ATTRIBUTES RESULTS IN DELETING ALL JOBS
   * delete a specific job by specifying an attribute:
   *    create jobTemplate-Object and assign searched attributes and values
   * delete all entries:
   *    create jobTemplate-Object and assign NO attributes
   * @param {number] jId ID of the Job to be deleted
   */
  deleteJob(jId: String): any {
    let tempJob: jobTemplate = {_id:jId};
    return this.http.post('http://' + this.serverAdress + '/jobs/delete', tempJob, {headers: this.headers})
  }

  /**
   * Like a Job to setup the match
   * Use this instead of Update because you can not append an array
   * @param {number} uId ID of the liking user
   * @param {number} jId ID of the liked job
   */
  likeJob(uId: String, jId: String){
    let tempJob: jobTemplate = {_id: jId};
    //Create observable resolving when everything is done
    return new Observable<any>( observer => {
      //get job
      this.getJob(tempJob).subscribe(
        data => {
          //add temporarily used variables
          let tempJob = data[0] as jobTemplate;
          let tempTemptedUsers: String[] = tempJob.jobTemptedWorkers;
          //Add to array
          if (tempTemptedUsers){
            tempTemptedUsers.push(uId);
          } else {
            tempTemptedUsers = [uId];
          }
          tempJob.jobTemptedWorkers = tempTemptedUsers;
          delete tempJob._id;
          //Update Job on Server
          this.updateJob(jId,tempJob).subscribe(
            data => {
              observer.next() //resolve observable
            }, error => {
              console.log(error);
            }
          );
        }
      )});
  }

  /**
   * Dislike a Job to never see it again
   * Use this instead of Update because you can not append an array
   * @param {number} uId ID of the disliking user
   * @param {number} jId ID of the disliked job
   */
  dislikeJob(uId: String, jId: String){ //just like liking job but update the declined workers array
    let tempJob: jobTemplate = {_id: jId};
    return new Observable<any>( observer => {
      this.getJob(tempJob).subscribe(
        data => {
          //add temporarily used variables
          let tempJob = data[0] as jobTemplate;
          let tempDeclinedUsers: String[] = tempJob.jobDeclinedWorkers;
          //Add to array
          if (tempDeclinedUsers){
            tempDeclinedUsers.push(uId);
          } else {
            tempDeclinedUsers = [uId];
          }
          tempJob.jobDeclinedWorkers = tempDeclinedUsers;
          delete tempJob._id;
          //Update Job on Server
          this.updateJob(jId,tempJob).subscribe(
            data => {
              observer.next();
            }, error => {
              console.log(error);
            }
          );
        }
      )});
  }

  /**
   *
   * @param {number} mlat
   * @param {number} mlon
   * @param {String} m_id
   * @param {number} m_dist
   * @returns {Observable<Object>}
   */
  getMatchingJobs(mlat: number, mlon: number, m_id: String, m_dist: number){
    //define searched for location
    let tempLoc = {lat: mlat, lon: mlon, id: m_id, dist: m_dist};
    //search for nearby jobs
    return this. http.post('http://' + this.serverAdress + '/jobs/cards', tempLoc, {headers: this.headers});
  }
}
