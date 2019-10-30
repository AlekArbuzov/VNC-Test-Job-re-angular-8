import {Component, OnDestroy, OnInit} from '@angular/core';
import {BeginGetConversationAction} from 'src/app/store/actions/conversation.actions';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ConversationState} from 'src/app/store/state/conversation.state';
import {Conversation} from 'src/app/store/models/conversation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private ConversationSubscription: Subscription;
  private conversation$: Observable<ConversationState>;
  private conversationList: Conversation[];

  constructor(
    private store: Store<ConversationState>
  ) {
    this.conversation$ = store.pipe(select('conversations'));
  }

  ngOnInit(): void {
    this.ConversationSubscription = this.conversation$
      .subscribe(x => this.conversationList = x.conversations);

    this.store.dispatch(BeginGetConversationAction());
  }

  ngOnDestroy(): void {
    this.ConversationSubscription.unsubscribe();
  }
}
