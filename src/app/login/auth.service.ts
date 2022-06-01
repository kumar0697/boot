import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = this.utilitiesService.getApiUrl();
authUrl = this.baseUrl + '/api/auth';
isAuthenticated = false;
redirectUrl : string = ' ';

@Output () authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http : HttpClient,private utilitiesService : UtilitiesService) { }

  private userAuthChanged (status : boolean){
    this.authChanged.emit(status);
  }

  login(userLogin: IUserLogin): Observable<boolean>{
    return this.http.post<boolean>(this.authUrl + '/login',userLogin)
    .pipe(
      map(loggedIn => {
        this.isAuthenticated = loggedIn;
        this.userAuthChanged(loggedIn);
        return loggedIn;
      }),
      catchError(this.handleError)
   );
  }

  logout(): Observable<boolean> {
    return this.http.post<boolean>(this.authUrl +  '/logout', null)
      .pipe(
        map(loggedOut => {
          this.isAuthenticated = !loggedOut;
          this.userAuthChanged = !(loggedOut);
          return loggedOut;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse){
    console.error ( 'server error: ',error);
    if(error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError (() => errMessage);
    }

    return throwError (() => error || 'Server error')
  }
}
