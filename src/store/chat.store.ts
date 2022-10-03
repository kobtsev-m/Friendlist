import { RootStore } from './root.store';
import { Conversation, Message, UserFull } from '../types/model.types';
import { USERS } from '../assets/mock/users.mock';
import { CONVERSATIONS } from '../assets/mock/conversations.mock';
import { makeAutoObservable } from 'mobx';

const objFromArray = (array: any[], key = 'id') => {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
};

export interface Contacts {
  byId: Record<string, UserFull>;
  allIds: string[];
}

export interface Conversations {
  byId: Record<string, Conversation>;
  allIds: string[];
}

export interface MessageData extends Omit<Message, 'id'> {
  conversationId: string;
  messageId: string;
}

export class ChatStore {
  contacts: Contacts = { byId: {}, allIds: [] };
  conversations: Conversations = { byId: {}, allIds: [] };
  activeConversationId: string | null = null;
  participants: UserFull[] = [];
  recipients: UserFull[] = [];

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.setContacts([USERS[0], USERS[1]]);
    this.setRecipients([USERS[0], USERS[1]]);
    this.setConversations(CONVERSATIONS);
  }

  get conversation(): Conversation {
    const { conversations, activeConversationId } = this;
    const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
    return (
      conversation ?? {
        id: '',
        messages: [],
        participants: [],
        unreadCount: 0,
        type: ''
      }
    );
  }

  setContacts(contacts: UserFull[]) {
    this.contacts.byId = objFromArray(contacts);
    this.contacts.allIds = Object.keys(this.contacts.byId);
  }

  setConversations(conversations: Conversation[]) {
    this.conversations.byId = objFromArray(conversations);
    this.conversations.allIds = Object.keys(this.conversations.byId);
  }

  setParticipants(participants: UserFull[]) {
    this.participants = participants;
  }

  setRecipients(recipients: UserFull[]) {
    this.recipients = recipients;
  }

  setConversationId(conversationId: string | null) {
    this.activeConversationId = conversationId;
    if (conversationId) {
      this.participants = this.conversations.byId[conversationId]?.participants ?? [];
    }
  }

  onSendMessage(messageData: MessageData) {
    const { conversationId, messageId, ...rest } = messageData;
    const newMessage = { id: messageId, ...rest };
    this.conversations.byId[conversationId].messages.push(newMessage);
  }

  markConversationAsRead(conversationId: string) {
    const conversation = this.conversations.byId[conversationId];
    if (conversation) {
      conversation.unreadCount = 0;
    }
  }
}
