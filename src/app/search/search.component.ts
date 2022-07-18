import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor() {}

  searchQueryParam: string = '';
  searchTerm: string = '';
  page: number = 1;
  per_page: number = 20;
  photosList: any = [];
  totalCount: number = 0;
  /**
   * This is a searchImage function which will map the typed query to search term which will further
   * invoke api call for searching image when user clicks the Search button
   * @author Amar nath
   * @param none
   */
  searchImage() {
    this.searchTerm = this.searchQueryParam;
  }
  /**
   * This is a onKeyDownPressed function which will map the typed query to search term which will further
   * invoke api call for searching image when user clicks Enter key inside search box
   * @author Amar nath
   * @param none
   */
  onKeyDownPressed(evt: any) {
    this.searchTerm = this.searchQueryParam;
  }
}
