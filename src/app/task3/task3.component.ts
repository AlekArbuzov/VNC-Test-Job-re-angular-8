import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';
import {bufferTime} from 'rxjs/operators';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
})
export class Task3Component implements OnInit, OnDestroy {
  private myNumber$: Observable<number>;
  private numberSubscription: Subscription;

  myNumbers: number[] = [];

  ngOnInit(): void {
    this.myNumber$ = timer(0, 500);
    this.numberSubscription = this.getNumbers()
      .subscribe(arrayOfNumbers => this.myNumbers = arrayOfNumbers);
  }

  ngOnDestroy(): void {
    this.numberSubscription.unsubscribe();
  }

  getNumbers(): Observable<number[]> {
    return this.myNumber$.pipe(
      bufferTime(2000)
    );
  }
}
