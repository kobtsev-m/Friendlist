import { Conversation, Message } from '../../types/model.types';
import { v4 as uuidv4 } from 'uuid';
import { USERS } from './users.mock';

const messages1: Message[] = [
  {
    id: uuidv4(),
    senderId: USERS[0].id,
    body: 'Hello bro!',
    contentType: 'text',
    attachments: [],
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    senderId: USERS[0].id,
    body: 'Bro?',
    contentType: 'text',
    attachments: [],
    createdAt: new Date()
  }
];

const messages2: Message[] = [
  {
    id: uuidv4(),
    senderId: USERS[3].id,
    body: 'How are you, honey?',
    contentType: 'text',
    attachments: [],
    createdAt: new Date()
  }
];

export const CONVERSATIONS: Conversation[] = [...Array(2)].map((_, i) => ({
  id: ['e5b8b448-b2e0-4fa9-b198-78db0c086bac', '206273d6-15fd-45b7-b79e-654ad0e6ffba'][i],
  type: 'other',
  messages: [messages1, messages2][i],
  participants: [[USERS[0]], [USERS[3]]][i],
  unreadCount: 0
}));
