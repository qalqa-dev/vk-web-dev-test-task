import type { Genre, rangeType } from './Response';

export interface FilterType {
  genres?: Genre[];
  rating?: rangeType;
  year?: rangeType;
}
