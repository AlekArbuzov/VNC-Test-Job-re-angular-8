import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
  BeginCreateMessageInConversationAction,
  BeginGetConversationAction,
  ErrorConversationAction,
  SuccessCreateMessageInConversationAction,
  SuccessGetConversationAction
} from '../actions/conversation.actions';

import {Conversation} from 'src/app/store/models/conversation';
import {Message} from 'src/app/store/models/message';

@Injectable()
export class ConversationEffects {
  constructor(
    private action$: Actions,
  ) {
  }

  private conversations$ = new BehaviorSubject<Conversation[]>([
    {
      id: 1,
      userName: 'John',
      messages: [
        {
          id: 1,
          conversation_id: 1,
          message: 'text'
        }
      ]
    }
  ]);

  GetConversations$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BeginGetConversationAction),
      mergeMap(action =>
        this.conversations$.pipe(
          map((data: Conversation[]) => {
            return SuccessGetConversationAction({payload: data});
          }),
          catchError((error: Error) => {
            return of(ErrorConversationAction(error));
          })
        )
      )
    )
  );

  CreateMessageOfConversation$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(BeginCreateMessageInConversationAction),
      mergeMap(action => {
          return of(action.payload).pipe(
            map((data: Message) => {
              return SuccessCreateMessageInConversationAction({payload: data});
            })
          );
        }
      )
    )
  );
}
