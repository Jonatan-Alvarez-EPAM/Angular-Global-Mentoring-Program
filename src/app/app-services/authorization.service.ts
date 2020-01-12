import { Injectable, Inject } from '@angular/core';
import { User } from '@app/app-models';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthorizationActions from '@app/store/actions/authorization.actions';
import { getAccessStatus, getUserStatus } from '@app/store/selectors/authorization.selectors';
import { AppState } from '@app/store';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  readonly USER = 'CURRENT_USER';
  readonly TOKEN = 'TOKEN';
  private token?: string;
  userInfo$: Observable<User> = this.store.select(getUserStatus);
  isAuthenticated$: Observable<boolean> = this.store.select(getAccessStatus);

  constructor(
    @Inject('Storage') private readonly localStorage: Storage,
    @Inject('BASE_URL') private readonly BASE_URL: string,
    private readonly httpClient: HttpClient,
    private store: Store<AppState>
  ) {
    const currentUserInfo: User = JSON.parse(this.localStorage.getItem(this.USER));
    if (Boolean(currentUserInfo)) {
      this.store.dispatch(AuthorizationActions.updateUser({ userInfo: currentUserInfo }));
      this.store.dispatch(AuthorizationActions.allowAccess());
    }
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
        this.store.dispatch(AuthorizationActions.updateUser({ userInfo }));
        this.store.dispatch(AuthorizationActions.allowAccess());
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
      this.store.dispatch(AuthorizationActions.updateUser({ userInfo: null }));
      this.store.dispatch(AuthorizationActions.removeAccess());
    }
  }

  private getUserInfo(token: string): Observable<User> {
    return this.httpClient.post<User>(`${this.BASE_URL}/auth/userinfo`, { token });
  }
}
