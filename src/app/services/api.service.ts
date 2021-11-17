import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // base url
  url: string = 'https://parallelum.com.br/fipe/api/v1';

  constructor(
    private http: HttpClient
  ) { }

  vehicleData(url: string){
    return this.http.get(this.url + url)
      .toPromise();
  }
}
