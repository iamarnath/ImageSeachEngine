import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  {
  constructor() {}

  searchQueryParam: string = '';
  searchTerm: string = '';
  page: number = 1;
  per_page: number = 20;
  photosList: any = [];
  totalCount: number = 0;

  searchImage() {
    this.searchTerm = this.searchQueryParam;
  }
  onKeyDownPressed(evt: any) {
    this.searchTerm = this.searchQueryParam;
  }
}
