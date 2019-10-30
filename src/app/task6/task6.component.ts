import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {ConversationState} from 'src/app/store/state/conversation.state';
import {Conversation} from 'src/app/store/models/conversation';
import {BeginCreateMessageInConversationAction} from 'src/app/store/actions/conversation.actions';
import {Message} from 'src/app/store/models/message';

@Component({
  selector: 'app-task6',
  templateUrl: './task6.component.html',
})
export class Task6Component {

  @Input()
  conversation: Conversation;

  message = '';

  constructor(private store: Store<ConversationState>) {
  }

  createMessage() {
    this.store.dispatch(BeginCreateMessageInConversationAction({
      payload: {
        id: this.getRandomId(),
        conversation_id: this.conversation.id,
        message: this.message,
      } as Message
    }));
    this.message = '';
  }

  getRandomId(): number {
    return Math.floor(Math.random() * 1000) + 1;
  }
}
