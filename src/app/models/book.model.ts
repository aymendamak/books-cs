import { Author } from './author.model';

export interface Book {
  id?: number;
  title: string;
  author: Author;
  description: string;
}
