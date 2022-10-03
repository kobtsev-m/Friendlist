import { v4 as uuidv4 } from 'uuid';
import { Group } from '../../types/model.types';
import post1 from '../img/posts/1.jpg';
import post2 from '../img/posts/2.jpg';
import post3 from '../img/posts/3.jpg';
import post4 from '../img/posts/4.jpg';
import post5 from '../img/posts/5.jpg';
import avatar3 from '../img/avatars/3g.jpg';
import avatar2 from '../img/avatars/2b.jpg';
import avatar4 from '../img/avatars/4g.jpg';
import avatar5 from '../img/avatars/5b.jpg';
import avatar1 from '../img/avatars/1g.jpg';

export const GROUPS: Group[] = [...Array(5)].map((_, i) => ({
  id: uuidv4(),
  avatar: [post1, post2, post3, post4, post5][i],
  users: [
    [avatar3, avatar2, avatar4, avatar5],
    [avatar1, avatar3, avatar5, avatar4],
    [avatar1, avatar4, avatar5],
    [avatar3],
    [avatar2, avatar5]
  ][i],
  name: ['Jazz Players', 'Street Musicians', 'Barts Team', 'Oscar Wilde', 'Jonny Deep Fun Club'][i],
  category: ['Guitar', 'Guitar', 'Football Section', 'Books & Podcasts', 'Films & Producing'][i],
  likes: [4, 5, 10, 25, 2][i],
  postType: undefined,
  createdAt: new Date()
}));
