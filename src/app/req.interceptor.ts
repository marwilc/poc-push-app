import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(request.url);
        if (request.url === '/firebase-messaging-sw.js') {
            const dupReq = request.clone({
              url: '/poc-push-app/firebase-messaging-sw.js'
            });
            return next.handle(dupReq);
        }
        return next.handle(request);
  }
}
