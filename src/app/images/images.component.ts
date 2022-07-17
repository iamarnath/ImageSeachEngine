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

  ngOnChanges(changes: SimpleChanges) {
    let currValue = changes['searchQueryParam']['currentValue'];
    let prevValue = changes['searchQueryParam']['previousValue'];
    if (currValue && prevValue != currValue) {
      this.searchImage();
    }
  }
  searchImage() {
    this.page = 1;
    this.totalCount = 0;
    this.totalPageCall = 0;
    this.photosList = [];
    this.getSearchedImageList();
  }
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
      }
    );
  }
  showImageModel(url: string, tag: string, likes: number, comments: number) {
    this.modelLargeImageURL = url;
    this.captionRef = tag;
    this.imgLikes = likes;
    this.imgComments = comments;
    this.showDialog();
  }
  closeModel() {
    this.viewContainerRef.clear();
  }
  onScrollDown(ev: any) {
    console.log(ev.currentScrollPosition);
    if (this.page < this.totalPageCall) {
      this.page++;
      this.getSearchedImageList();
    }
    this.direction = 'scroll down';
  }
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
