import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { StorageService } from '../blucake-services/storage.service';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const localUser = this.storage.getLocalUser();

        const N = API_CONFIG.baseUrl.length;
        const requestToAPI = req.url.substring(0, N) === API_CONFIG.baseUrl;

        if (localUser && requestToAPI) {
           const headers = req.headers
            .set('Content-Type', 'application/json')
            .set('Authorization',  'Bearer ' + localUser.token);


        const cloneReq = req.clone({ headers });

        return next.handle(cloneReq);
        } else {
            return next.handle(req);
        }
    }
}
