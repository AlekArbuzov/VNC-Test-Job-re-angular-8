import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
  private isLogged$ = new BehaviorSubject<boolean>(false);

  login() {
    this.isLogged$.next(true);
  }

  logOut() {
    this.isLogged$.next(false);
  }

  isUserLoggedIn() {
    return this.isLogged$;
  }
}
