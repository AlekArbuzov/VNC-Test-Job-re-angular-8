import {Message} from 'src/app/store/models/message';

export interface Conversation {
  id: number;
  messages: Message[];
  userName: string;
}
