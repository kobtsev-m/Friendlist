import { Place } from '../../types/model.types';
import { v4 as uuidv4 } from 'uuid';
import place1 from '../img/places/1.jpg';
import place2 from '../img/places/2.jpg';
import place3 from '../img/places/3.jpg';
import place4 from '../img/places/4.jpg';
import place5 from '../img/places/5.jpg';
import { CATEGORIES } from './categories.mock';

export const PLACES: Place[] = [...Array(5)].map((_, i) => ({
  id: uuidv4(),
  name: ['Дом родителей', 'Академия Кофе', "Choo's & Spot", 'Эдем', 'Православка'][i],
  description: [
    'Дом нереальных тусовок',
    'Нереальный кофе в Акажеме',
    'Бургерная на все времена, именно Чус! и Спот',
    'Торговый центр с золотыми урнами и KFC',
    'Лучший стадион для футбола (только нет мата, но это терпимо)'
  ][i],
  address: [
    'Новосибирск, Коптюга 5',
    'Новосибирск, Морской пр. 2',
    'Новосибирск, Ильича 10',
    'Новосибирск, Кутателадзе 4/4',
    'Новосибирск, Академическая 3'
  ][i],
  cover: [place1, place2, place3, place4, place5][i],
  lat: [54.84483299999999, 54.8408241, 54.8407047, 54.8600098, 54.83567490000001][i],
  lng: [83.10333899999999, 83.11017989999999, 83.09321469999999, 83.10539299999999, 83.1085566][i],
  category: [CATEGORIES[1], CATEGORIES[2], CATEGORIES[3], CATEGORIES[0], CATEGORIES[4]][i]
}));
