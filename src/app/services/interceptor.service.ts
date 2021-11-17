import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  authReq: any;

  constructor(
    
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
    
    
    if (!environment.production){
      console.log('Intercept HTTP call', this.authReq);
    }    

    return next.handle(this.authReq);
  }
}