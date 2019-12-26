import { Injectable, Inject } from '@angular/core';
import { User } from '@app/app-models';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  readonly USER = 'CURRENT_USER';
  readonly TOKEN = 'TOKEN';
  token?: string;

  constructor(@Inject('Storage') private readonly localStorage: Storage,
    @Inject('BASE_URL') private readonly BASE_URL: string,
    private readonly httpClient: HttpClient) {
    //localStorage.clear();
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
    }
  }

  isAuthenticated(): boolean {
    const currentUser = this.localStorage.getItem(this.USER);
    return !!currentUser;
  }

  getUserInfo(token: string): Observable<User> {
    return this.httpClient.post<User>(`${this.BASE_URL}/auth/userinfo`, { token });
  }
}
