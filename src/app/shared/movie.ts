export class Movie {
  id: number;
  title: string;
  cover_image: string;
  description: string;
  release_date: Date;
  cast_actors: string;
  type_id: number;
  avg_rating: number;

  constructor(data: any) {
      {
        this.id = data.id;
        this.title = data.title || '';
        this.cover_image = data.cover_image || '';
        this.description = data.description || '';
        this.release_date = data.release_date || '';
        this.cast_actors = data.cast_actors || '';
        this.type_id = data.type_id || '';
        this.avg_rating = data.avg_rating || 0;
      }
  }
}
