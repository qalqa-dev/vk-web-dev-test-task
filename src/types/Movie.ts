export type Movie = {
  id: number;
  imgUrl?: string;
  title: string;
  year: number;
  rating: number;
  composer?: string;
  director?: string;
  genres?: string[];
};
