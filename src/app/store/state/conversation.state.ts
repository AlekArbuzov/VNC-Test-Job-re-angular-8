import {Conversation} from 'src/app/store/models/conversation';

export interface ConversationState {
  conversations: Conversation[];
}

export const initialConversationState = () => {
  return {conversations: Array<Conversation>()};
};
