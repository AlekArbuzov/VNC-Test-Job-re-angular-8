import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export interface Message {
  userId: number;
  id: number;
  title: string;
}

@Component({
  selector: 'app-task4',
  templateUrl: './task4.component.html',
})
export class Task4Component implements OnInit {
  private messages: Message[];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.updateMessagesOnce('');
  }

  onInputChange($event) {
    this.updateMessagesOnce($event.target.value);
  }

  private updateMessagesOnce(keyword: string) {
    this.searchMessages(keyword)
      .pipe(
        first()
      )
      .subscribe(
        messages => this.messages = messages
      );
  }

  searchMessages(keyword: string): Observable<Message[]> {
    return this.http.get<Message[]>('https://jsonplaceholder.typicode.com/todos?_limit=30')
      .pipe(
        map(messages => messages.filter(message => message.title.indexOf(keyword) > -1))
      );
  }
}
