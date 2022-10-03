import { User } from './api.types';

export interface Category {
  id: string;
  name: string;
  title: string;
  cover: string;
}

export interface Group {
  id: string;
  avatar: string;
  users: string[];
  name: string;
  category: string;
  likes: number;
  postType?: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  cover: string;
  title: string;
  view: number;
  comment: number;
  share: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: Date;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  address: string;
  cover: string;
  lat: number;
  lng: number;
  category: Category;
}

export interface UserFull extends User {
  avatarUrl: string;
  status: 'online' | 'offline';
}

export interface Message {
  id: string;
  senderId: string;
  contentType: 'image' | 'text';
  body: string;
  attachments: any[];
  createdAt: Date;
}

export interface Conversation {
  id: string;
  messages: Message[];
  participants: UserFull[];
  unreadCount: number;
  type: string;
}
