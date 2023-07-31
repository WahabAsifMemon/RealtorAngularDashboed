import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('call first',error);
        this.toastr.error(error?.error?.message ? error?.error?.message : error?.error?.error);
        if (error.status === 401) {
          this.logoutUser();
        }
        return throwError(error);
      })
    );
  }

  async logoutUser() {
    await this.http.post('admin/logout', {}, true).subscribe((res: any) => {
      console.log(res);
      localStorage.clear();
      this.router.navigateByUrl('auth/login');
    });
  }
}
