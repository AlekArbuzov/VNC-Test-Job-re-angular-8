import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {DetectOnlineService} from 'src/app/shared/detect-online.service';
import {HttpClient} from '@angular/common/http';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
})
export class Task1Component implements OnInit, OnDestroy {
  private todoSubscription: Subscription;
  private todo: Todo;
  private isOnlineSubscribe: Subscription;

  constructor(
    private detectOnlineService: DetectOnlineService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.isOnlineSubscribe = this.detectOnlineService.getOnlineStatus().subscribe(isOnline => {
      if (isOnline) {
        this.startPoling();
      } else {
        this.stopPoling();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopPoling();
    this.isOnlineSubscribe.unsubscribe();
  }

  startPoling() {
    this.todoSubscription = timer(0, 1000)
      .pipe(
        concatMap(x => {
          return this.http.get<Todo>('https://jsonplaceholder.typicode.com/todos/' + this.getRandomInt());
        })
      )
      .subscribe(next => {
        this.todo = next;
      }, (error) => console.log(error));
  }

  stopPoling() {
    this.todoSubscription.unsubscribe();
  }

  private getRandomInt(): number {
    return Math.floor(Math.random() * 200) + 1;
  }
}
