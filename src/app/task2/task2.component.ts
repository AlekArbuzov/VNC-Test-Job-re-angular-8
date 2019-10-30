import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DetectOnlineService} from 'src/app/shared/detect-online.service';
import {UserService} from 'src/app/shared/user.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
})
export class Task2Component implements OnInit {
  isUserOnline$: Observable<boolean>;

  constructor(
    private detectOnlineService: DetectOnlineService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.isUserOnline$ = combineLatest(
      this.userService.isUserLoggedIn(),
      this.detectOnlineService.getOnlineStatus()
    ).pipe(
      map(pair => {
        const [isUserLogged, isOnline] = pair;
        return isUserLogged && isOnline;
      })
    );
  }

  login() {
    this.userService.login();
  }

  logOut() {
    this.userService.logOut();
  }
}
