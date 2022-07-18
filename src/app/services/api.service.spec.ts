import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
 
  beforeEach(() => {
    const httpServiceStub = () => ({
      get: () => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpService, useFactory: httpServiceStub }
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getImageList to bring list of images', () => {
    it('makes expected calls', () => {
      const httpServiceStub: HttpService = TestBed.inject(HttpService);
      spyOn(httpServiceStub, 'get').and.callThrough();
      var params = {key:"1234",image_type:"image"};
      service.getImageList(params);
      expect(httpServiceStub.get).toHaveBeenCalled();
    });
  });
});
