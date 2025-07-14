export type Movie = {
  id: number;
  imgUrl?: string;
  name: string | null;
  alternativeName: string | null;
  year: number;
  rating: number;
  composer?: string;
  director?: string;
  genres?: string[];
  description?: string;
};
