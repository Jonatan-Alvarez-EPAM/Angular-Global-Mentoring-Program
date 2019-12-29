import { Injectable, Inject } from '@angular/core';
import { User } from '@app/app-models';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  readonly USER = 'CURRENT_USER';
  readonly TOKEN = 'TOKEN';
  private token?: string;
  userInfo$: Subject<User> | BehaviorSubject<User>;
  isAuthenticated$: BehaviorSubject<boolean>;

  constructor(@Inject('Storage') private readonly localStorage: Storage,
    @Inject('BASE_URL') private readonly BASE_URL: string,
    private readonly httpClient: HttpClient) {
    //localStorage.clear();
    const currentUserInfo: User = JSON.parse(this.localStorage.getItem(this.USER));
    this.isAuthenticated$ = new BehaviorSubject(Boolean(currentUserInfo));
    this.userInfo$ = Boolean(currentUserInfo) ? new BehaviorSubject(currentUserInfo) : new Subject();
  }

  login(login?: string, password?: string) {
    const currentUser = this.localStorage.getItem(this.USER);
    if (!currentUser) {
      const loginResponse$ = this.httpClient.post<{ token: string }>(`${this.BASE_URL}/auth/login`, { login, password });
      const result$ = loginResponse$.pipe(
        tap(response => this.localStorage.setItem(this.TOKEN, response.token)),
        switchMap(response => this.getUserInfo(response.token)));

      result$.subscribe((userInfo: User) => {
        this.localStorage.setItem(this.USER, JSON.stringify(userInfo));
        this.userInfo$.next(userInfo);
        this.isAuthenticated$.next(true);
      }, error => {
        alert('Incorrect email and/or password.');
        console.error(error);
      });
    }
  }

  logout() {
    const currentUser = this.localStorage.getItem(this.USER);
    if (currentUser) {
      this.localStorage.removeItem(this.USER);
      this.userInfo$.next(undefined);
      this.isAuthenticated$.next(false);
    }
  }

  private getUserInfo(token: string): Observable<User> {
    return this.httpClient.post<User>(`${this.BASE_URL}/auth/userinfo`, { token });
  }
}
