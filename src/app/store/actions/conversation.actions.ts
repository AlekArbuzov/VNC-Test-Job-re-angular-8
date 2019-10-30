import {createAction, props} from '@ngrx/store';
import {Conversation} from 'src/app/store/models/conversation';
import {Message} from 'src/app/store/models/message';

export const GetConversationAction = createAction('[Conversation] - Get Conversation');

export const CreateConversationAction = createAction(
  '[Conversation] - Create Conversation',
  props<Conversation>()
);

export const BeginGetConversationAction = createAction('[Conversation] - Begin Get Conversation');

export const SuccessGetConversationAction = createAction(
  '[Conversation] - Success Get Conversation',
  props<{ payload: Conversation[] }>()
);

export const BeginCreateMessageInConversationAction = createAction(
  '[Conversation] - Begin Create Message in Conversation',
  props<{ payload: Message }>()
);

export const SuccessCreateMessageInConversationAction = createAction(
  '[Conversation] - Success Create Message in Conversation',
  props<{ payload: Message }>()
);

export const ErrorConversationAction = createAction('[Conversation] - Error', props<Error>());
