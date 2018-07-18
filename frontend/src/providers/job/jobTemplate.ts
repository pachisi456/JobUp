export class jobTemplate{
  _id?: String;
  jobTitle?: String;
  jobCreationDate?: Date;
  jobDescription?: String[];
  jobImage?: File;
  jobLon?: number;
  jobLat?: number;
  jobCategory?: String;
  jobSubcategory?: String;
  jobSalary?: number;
  jobDuration?: String;
  jobEmployer?: String;
  jobStatus?: String;
  jobTemptedWorkers?: String[];
  jobDeclinedWorkers?: String[];
  jobWorker?: String;
}
