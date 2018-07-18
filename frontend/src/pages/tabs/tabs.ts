import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { JobsPage } from '../jobs/jobs';
import {ProfilePage} from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = JobsPage;
  tab2Root = SearchPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
