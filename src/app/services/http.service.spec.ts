import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(HttpService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`AUTH_TOKEN has default value`, () => {
    expect(service.AUTH_TOKEN).toEqual(`auth_token`);
  });

  it('makes get call', () => {
    var params = {key:"1234",image_type:"image"};
    service.get("url",params);
  });
  it('should call errorHandler', () => {
    var errRes = {"headers":{"normalizedNames":{},"lazyUpdate":null},"status":400,"statusText":"OK","url":"https://pixabay.com/api/?q=sdf&per_page=20&page=1&key=28660542-&image_type=photo","ok":false,"name":"HttpErrorResponse","message":"Http failure response for https://pixabay.com/api/?q=sdf&per_page=20&page=1&key=28660542-&image_type=photo: 400 OK","error":"[ERROR 400] Invalid API key. Note: This value is case-sensitive."};
    service.errorHandler(errRes);
  });
});
