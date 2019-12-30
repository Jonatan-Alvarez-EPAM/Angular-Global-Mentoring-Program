import { Injectable, Inject } from '@angular/core';
import { User } from '@app/app-models';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly KEY = 'CURRENT_USER';

  constructor(@Inject('Storage') private readonly localStorage: Storage) {
    //localStorage.clear();
  }

  login() {
    const currentUser = this.localStorage.getItem(this.KEY);
    if (!currentUser) {
      const userInfo: User = {
        id: 'ID_1',
        firstName: 'Name',
        lastName: 'Last Name',
      };
      this.localStorage.setItem(this.KEY, JSON.stringify(userInfo));
    }
  }

  logout() {
    const currentUser = this.localStorage.getItem(this.KEY);
    if (currentUser) {
      this.localStorage.removeItem(this.KEY);
    }
  }

  isAuthenticated(): boolean {
    const currentUser = this.localStorage.getItem(this.KEY);
    return !!currentUser;
  }

  getUserInfo(): User | undefined {
    const currentUser = this.localStorage.getItem(this.KEY);
    if (currentUser) {
      return JSON.parse(currentUser) as User;
    }
  }
}
