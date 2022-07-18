import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Pic } from '../models/pic';
import { PicList } from '../models/picList';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit, OnChanges {
  @Input() searchQueryParam: string = '';
  direction = '';
  page: number = 1;
  per_page: number = 20;
  photosList: Pic[] = [];
  totalCount: number = 0;
  totalPageCall: number = 0;
  modelLargeImageURL: string = '';
  captionRef: string = '';
  imgLikes: number = 0;
  imgComments: number = 0;
  noResponse: boolean = false;
  @ViewChild('imgPreviewModel') imgPreviewModel!: TemplateRef<any>;
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}
  /**
   * This is a ngOnChanges function which will trigger the api
   *  call for searching images if any keyword is typed in search box.
   * @author Amar nath
   * @param {SimpleChanges} changes - contains currentValue,previousValue,firstchange of the searchQueryParam
   */
  ngOnChanges(changes: SimpleChanges) {
    let currValue = changes['searchQueryParam']['currentValue'];
    let prevValue = changes['searchQueryParam']['previousValue'];
    if (currValue && prevValue != currValue) {
      this.searchImage();
    }
  }
  /**
   * This is a searchImage function which will trigger the api
   *  call for searching images if search button is clicked.
   * @author Amar nath
   * @param none
   */
  searchImage() {
    this.page = 1;
    this.totalCount = 0;
    this.totalPageCall = 0;
    this.photosList = [];
    this.getSearchedImageList();
  }
  /**
   * This is a getSearchedImageList function which will trigger the api
   *  call getImageList from apiservice for searching images.
   * @author Amar nath
   * @param none
   */
  getSearchedImageList() {
    this.noResponse = false;
    const params = {
      q: this.searchQueryParam,
      per_page: this.per_page,
      page: this.page,
    };
    this.apiService.getImageList(params).subscribe(
      (res: PicList) => {
        this.totalCount = res.total;
        this.totalPageCall = Math.ceil(this.totalCount / this.per_page);
        if (res && res.hits && res.hits.length > 0) {
          this.photosList = [...this.photosList, ...res.hits];
        } else if (res.hits && res.hits.length === 0) {
          this.noResponse = true;
        }
      },
      (error) => {
        this.noResponse = true;
        alert("Server error.Please try again");
      }
    );
  }
  /**
   * This is a showImageModel function which will open the modal pop up when user clicks on any image.
   * @author Amar nath
   * @param {string} url - A string param  - url of image
   * @param {string} tag - A string param  - tag associated with image
   * @param {string} likes - A number param  - number of likes associated with image
   * @param {string} comments - A number param  - number of comments associated with image
   */
  showImageModel(url: string, tag: string, likes: number, comments: number) {
    this.modelLargeImageURL = url;
    this.captionRef = tag;
    this.imgLikes = likes;
    this.imgComments = comments;
    this.showDialog();
  }
 /**
   * This is a closeModel function which will close the opened modal.
   * @author Amar nath
   * @param  none
   */
  closeModel() {
    this.viewContainerRef.clear();
  }
   /**
   * This is a onScrollDown function which will call the image api when user scrolls down the page.
   * This is to implement infinite scroll.
   * @author Amar nath
   * @param  {any} ev - event contains currentScrollPosition while scrolling
   */
  onScrollDown(ev: any) {
    if (this.page < this.totalPageCall) {
      this.page++;
      this.getSearchedImageList();
    }
    this.direction = 'scroll down';
  }
   /**
   * This is a showDialog function which will show the modal when user clicks on any image.
   * @author Amar nath
   * @param none
   */
  showDialog() {
    let view = this.imgPreviewModel.createEmbeddedView(null);
    this.viewContainerRef.insert(view);
    this.imgPreviewModel.elementRef.nativeElement.previousElementSibling.classList.remove(
      'hhidden'
    );
    this.imgPreviewModel.elementRef.nativeElement.previousElementSibling.classList.add(
      'sshow'
    );
  }
}
