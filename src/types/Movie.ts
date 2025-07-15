import type { MovieDoc } from './Response';

export type Movie = Pick<
  MovieDoc,
  | 'id'
  | 'name'
  | 'alternativeName'
  | 'poster'
  | 'year'
  | 'rating'
  | 'genres'
  | 'description'
>;
