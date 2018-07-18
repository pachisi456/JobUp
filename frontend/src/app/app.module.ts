import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, ToastController} from 'ionic-angular';
import { MyApp } from './app.component';

import { SearchPage } from '../pages/search/search';
import { JobsPage } from '../pages/jobs/jobs';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {CategoriesPage} from "../pages/jobs/categories/categories";
import {JobcreationPage} from "../pages/jobs/jobcreation/jobcreation";
import {ProfilePage} from "../pages/profile/profile";
import {SearchsettingsPage} from "../pages/search/searchsettings/searchsettings";
import {HttpModule} from "@angular/http";
import {SwingModule} from "angular2-swing";
import { JobProvider } from '../providers/job/job';
import { UserProvider } from '../providers/user/user';
import {SignupPage} from "../pages/signup/signup";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import {Geolocation} from "@ionic-native/geolocation";
import {JobApplicantsPage} from "../pages/jobs/job-applicants/job-applicants";
import {ShortprofilePage} from "../pages/profile/shortprofile/shortprofile";
import {ContactdetailsPage} from "../pages/profile/contactdetails/contactdetails";
import {CallNumber} from "@ionic-native/call-number";
import {SMS} from "@ionic-native/sms";
import {EmailComposer} from "@ionic-native/email-composer";
import {Contacts} from "@ionic-native/contacts";
import {HttpClientModule} from "@angular/common/http";
import {JobviewPage} from "../pages/jobs/jobview/jobview";
import {EditprofilePage} from "../pages/profile/editprofile/editprofile";
import { LocationProvider } from '../providers/location/location';
import { SettingsProvider } from '../providers/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    JobsPage,
    TabsPage,
    CategoriesPage,
    JobcreationPage,
    ProfilePage,
    SearchsettingsPage,
    SignupPage,
    JobApplicantsPage,
    ShortprofilePage,
    ContactdetailsPage,
    JobviewPage,
    EditprofilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    SwingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    JobsPage,
    TabsPage,
    CategoriesPage,
    JobcreationPage,
    ProfilePage,
    SearchsettingsPage,
    SignupPage,
    JobApplicantsPage,
    ShortprofilePage,
    ContactdetailsPage,
    JobviewPage,
    EditprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FingerprintAIO,
    JobProvider,
    UserProvider,
    BackgroundGeolocation,
    Geolocation,
    CallNumber,
    SMS,
    EmailComposer,
    Contacts,
    ToastController,
    LocationProvider,
    SettingsProvider
  ]
})
export class AppModule {}
