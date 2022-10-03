import { v4 as uuidv4 } from 'uuid';
import guitar from '../img/categories/guitar.jpg';
import football from '../img/categories/football.jpeg';
import programming from '../img/categories/programming.jpg';
import books from '../img/categories/books.jpg';
import films from '../img/categories/films.jpg';
import { Category } from '../../types/model.types';

export const CATEGORIES: Category[] = [...Array(5)].map((_, i) => ({
  id: uuidv4(),
  name: ['Guitar', 'Football Section', 'Programming', 'Books & Podcasts', 'Films & Producing'][i],
  title: [
    'Learn to play new riffs',
    'Play with command of your dream',
    'Code with guys like you',
    'Find people interested in same themes',
    'Discuss new Tarantino movie'
  ][i],
  cover: [guitar, football, programming, books, films][i]
}));
