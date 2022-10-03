import { Role } from '../../types/api.types';
import { UserFull } from '../../types/model.types';
import { v4 as uuidv4 } from 'uuid';
import avatar1 from '../img/avatars/1g.jpg';
import avatar2 from '../img/avatars/2b.jpg';
import avatar3 from '../img/avatars/3g.jpg';
import avatar4 from '../img/avatars/4g.jpg';
import avatar5 from '../img/avatars/5b.jpg';

export const USERS: UserFull[] = [...Array(5)].map((_, i) => ({
  id: uuidv4(),
  email: ['a@gmail.com', 'b@gmail.com', 'c@gmail.com', 'd@gmail.com', 'e@gmail.com'][i],
  firstName: ['Meerab', 'Shelbie', 'Susannah', 'Milli', 'Joao'][i],
  lastName: ['Gregory', 'Greenaway', 'Duran', 'Preece', 'Ramsay'][i],
  password: '',
  avatarUrl: [avatar1, avatar2, avatar3, avatar4, avatar5][i],
  role: Role.User,
  status: ['online', 'online', 'offline', 'offline', 'online'][i] as 'online' | 'offline',
  createdAt: new Date(),
  updatedAt: new Date()
}));

export const FRIENDS: UserFull[] = [...Array(2)].map((_, i) => ({
  id: uuidv4(),
  email: ['a@gmail.com', 'c@gmail.com'][i],
  firstName: ['Meerab', 'Susannah'][i],
  lastName: ['Gregory', 'Duran'][i],
  password: '',
  avatarUrl: [avatar1, avatar3][i],
  role: Role.User,
  status: ['online', 'online'][i] as 'online' | 'offline',
  createdAt: new Date(),
  updatedAt: new Date()
}));
