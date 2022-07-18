import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA,SimpleChange,SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';
import { ImagesComponent } from './images.component';

describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;
  const imageListJson = {
    total: 2895,
    totalHits: 500,
    hits: [
      {
        id: 3063284,
        pageURL:
          'https://pixabay.com/photos/rose-flower-petal-floral-noble-3063284/',
        type: 'photo',
        tags: 'rose, flower, petal',
        previewURL:
          'https://cdn.pixabay.com/photo/2018/01/05/16/24/rose-3063284_150.jpg',
        previewWidth: 150,
        previewHeight: 99,
        webformatURL:
          'https://pixabay.com/get/g4eab10c2dfac019fed970080d4f1a9cd9e2eb39316b59dbeb58c4271c70fe80fbae6823deae61949d923ef52e0e0c7fcd436b89ee0f7ebac0229f950383165e9_640.jpg',
        webformatWidth: 640,
        webformatHeight: 426,
        largeImageURL:
          'https://pixabay.com/get/g730616ca5c4d42a80e8411c49779a6ecf75a4f06914df2913cb7423f942d5c27f9054fe4e93c13abfa4a19c3a433dd316a329b121cd2c1e9c49974acb320e175_1280.jpg',
        imageWidth: 6000,
        imageHeight: 4000,
        imageSize: 3574625,
        views: 974619,
        downloads: 631365,
        collections: 1317,
        likes: 1463,
        comments: 318,
        user_id: 1564471,
        user: 'anncapictures',
        userImageURL:
          'https://cdn.pixabay.com/user/2015/11/27/06-58-54-609_250x250.jpg',
      },
      {
        id: 1239729,
        pageURL:
          'https://pixabay.com/photos/piano-rose-yellow-rose-old-piano-1239729/',
        type: 'photo',
        tags: 'piano, rose, yellow rose',
        previewURL:
          'https://cdn.pixabay.com/photo/2016/03/06/05/03/piano-1239729_150.jpg',
        previewWidth: 150,
        previewHeight: 84,
        webformatURL:
          'https://pixabay.com/get/gdcdfb444d8728a05b173af9754de038d96c6b4363451a37b4c7b83db32a13101af158a4be4b1915f3643756003a0b4039d3aa8cf5b0a7c5466fe437c17a0350f_640.jpg',
        webformatWidth: 640,
        webformatHeight: 360,
        largeImageURL:
          'https://pixabay.com/get/gb88a6eaeb213f74cfdadbc81eecac6a1c41c4a848b6e52cde96fb60a7b5e25262bb8110cd0a7d0d9f38277eea205ec8c8c9f0d265a263003123f7abde567ea72_1280.jpg',
        imageWidth: 1920,
        imageHeight: 1080,
        imageSize: 389196,
        views: 178969,
        downloads: 88954,
        collections: 592,
        likes: 691,
        comments: 109,
        user_id: 2169007,
        user: 'MartyNZ',
        userImageURL:
          'https://cdn.pixabay.com/user/2016/03/06/05-00-12-588_250x250.png',
      },
    ],
  };
  const apiServiceStub = () => ({
    getImageList: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ImagesComponent],
      providers: [{ provide: ApiService, useFactory: apiServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSearchedImageList with hits equality', () => {
    component.per_page = 2;
    const restService = TestBed.inject(ApiService);
    spyOn(restService, 'getImageList').and.returnValue(of(imageListJson));
    component.getSearchedImageList();
    expect(component.photosList.length).toEqual(2);
    expect(component.noResponse).toEqual(false);
  });
  it('should call getSearchedImageList with hits inequality', () => {
    component.per_page = 2;
    const restService = TestBed.inject(ApiService);
    spyOn(restService, 'getImageList').and.returnValue(of(imageListJson));
    component.getSearchedImageList();
    expect(component.photosList.length).not.toEqual(3);
  });
  it('should call getSearchedImageList with hits zero equality', () => {
    component.per_page = 2;
    const restService = TestBed.inject(ApiService);
    var data = {
      total: 0,
      totalHits: 500,
      hits: [],
    };
    spyOn(restService, 'getImageList').and.returnValue(of(data));
    component.getSearchedImageList();
    expect(component.photosList.length).toEqual(0);
    expect(component.noResponse).toEqual(true);
  });
  it('should call getSearchedImageList with hits zero inequality', () => {
    component.per_page = 2;
    const restService = TestBed.inject(ApiService);
    var data = {
      total: 0,
      totalHits: 500,
      hits: [],
    };
    spyOn(restService, 'getImageList').and.returnValue(of(data));
    component.getSearchedImageList();
    expect(component.photosList.length).not.toEqual(1);
    expect(component.noResponse).toEqual(true);
  });
  it('should call searchImage', () => {
    component.page = 1;
    component.photosList = [];
    component.searchImage();
    expect(component.page).toEqual(1);
    expect(component.photosList).toEqual([]);
  });
  it('should call showImageModel', () => {
    var imgData = {
      id: 3063284,
      pageURL:
        'https://pixabay.com/photos/rose-flower-petal-floral-noble-3063284/',
      type: 'photo',
      tags: 'rose, flower, petal',
      previewURL:
        'https://cdn.pixabay.com/photo/2018/01/05/16/24/rose-3063284_150.jpg',
      previewWidth: 150,
      previewHeight: 99,
      webformatURL:
        'https://pixabay.com/get/g4eab10c2dfac019fed970080d4f1a9cd9e2eb39316b59dbeb58c4271c70fe80fbae6823deae61949d923ef52e0e0c7fcd436b89ee0f7ebac0229f950383165e9_640.jpg',
      webformatWidth: 640,
      webformatHeight: 426,
      largeImageURL:
        'https://pixabay.com/get/g730616ca5c4d42a80e8411c49779a6ecf75a4f06914df2913cb7423f942d5c27f9054fe4e93c13abfa4a19c3a433dd316a329b121cd2c1e9c49974acb320e175_1280.jpg',
      imageWidth: 6000,
      imageHeight: 4000,
      imageSize: 3574625,
      views: 974619,
      downloads: 631365,
      collections: 1317,
      likes: 1463,
      comments: 318,
      user_id: 1564471,
      user: 'anncapictures',
      userImageURL:
        'https://cdn.pixabay.com/user/2015/11/27/06-58-54-609_250x250.jpg',
    };
    component.showImageModel(imgData.largeImageURL,imgData.tags,imgData.likes,imgData.comments);
  });
  it('should call showDialog', () => {
    component.showDialog();
  });

  it('should call closeModel', () => {
    component.closeModel();
   // spyOn(component, 'closeModel').and.returnValue({}));
   // expect(component.closeModel()).toHaveBeenCalled();
  });
  it('should call onScrollDown when total page call is greater than current page', () => {
    var evt = {
      currentScrollPosition:1995
    };
    component.page = 1;
    component.totalPageCall = 10;
    component.onScrollDown(evt);
  });
  it('should call onScrollDown when total page call is equal to current page', () => {
    var evt = {
      currentScrollPosition:3538
    };
    component.page = 10;
    component.totalPageCall = 10;
    component.onScrollDown(evt);
  });
});
