import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Pic } from '../models/pic';
import { PicList } from '../models/picList';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  image_type: string = 'photo';
  constructor(private httpService: HttpService) {}

  getImageList(qParams: any): Observable<PicList> {
    qParams['key'] = environment.API_KEY;
    qParams['image_type'] = this.image_type;
    return this.httpService
      .get('', qParams)
      .pipe(map((data) => data as PicList));
  }
}
