import {BehaviorSubject, fromEvent, Observable, Subscription} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectOnlineService {
  private onlineEvent: Observable<Event>;
  private offlineEvent: Observable<Event>;
  private onlineSubscribe: Subscription;
  private offlineSubscribe: Subscription;
  private isOnline$ = new BehaviorSubject<boolean>(true);

  constructor() {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscribe();
  }

  subscribe() {
    this.onlineSubscribe = this.onlineEvent.subscribe(e => {
      this.isOnline$.next(true);
    });

    this.offlineSubscribe = this.offlineEvent.subscribe(e => {
      this.isOnline$.next(false);
    });
  }

  unsubscribe() {
    this.onlineSubscribe.unsubscribe();
    this.offlineSubscribe.unsubscribe();
  }

  getOnlineStatus(): Observable<boolean> {
    return this.isOnline$;
  }
}
