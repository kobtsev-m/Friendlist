import { v4 as uuidv4 } from 'uuid';
import { Post } from '../../types/model.types';
import topic1 from '../img/topics/1.jpg';
import topic2 from '../img/topics/2.jpg';
import topic3 from '../img/topics/3.jpg';
import topic4 from '../img/topics/4.jpg';
import topic5 from '../img/topics/5.jpg';
import topic6 from '../img/topics/6.jpg';
import topic7 from '../img/topics/7.jpg';
import avatar1 from '../img/avatars/1g.jpg';
import avatar2 from '../img/avatars/2b.jpg';
import avatar3 from '../img/avatars/3g.jpg';
import avatar4 from '../img/avatars/4g.jpg';
import avatar5 from '../img/avatars/5b.jpg';

export const POSTS: Post[] = [...Array(7)].map((_, i) => ({
  id: uuidv4(),
  cover: [topic1, topic2, topic3, topic4, topic5, topic6, topic7][i],
  title: [
    'Master The Art Of Street View ',
    'Do You Make These Artist Mistakes?',
    '5 Romantic Religion Ideas',
    'Having A Provocative Messiah Works Only Under These Conditions',
    'How To Make Czech Beer',
    'Famous Quotes On Street Art',
    'Omg! The Best New Medicines Ever!'
  ][i],
  author: [
    { name: 'Meerab Gregory', avatarUrl: avatar1 },
    { name: 'Shelbie Greenaway', avatarUrl: avatar2 },
    { name: 'Susannah Duran', avatarUrl: avatar3 },
    { name: 'Milli Preece', avatarUrl: avatar4 },
    { name: 'Joao Ramsay', avatarUrl: avatar5 },
    { name: 'Meerab Gregory', avatarUrl: avatar3 },
    { name: 'Shelbie Greenaway', avatarUrl: avatar2 }
  ][i],
  view: 0,
  comment: 0,
  share: 0,
  createdAt: new Date()
}));
