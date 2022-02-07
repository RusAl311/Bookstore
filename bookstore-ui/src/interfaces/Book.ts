import IAuthor from './Author';
import IGenre from './Genre';

export default interface IBook {
    bookId: number;
    name: string;
    description: string;
    pages: number;
    author?: IAuthor;
    genres?: Array<IGenre>;
}
