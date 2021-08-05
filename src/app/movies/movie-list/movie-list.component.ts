import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RatingDialogComponent } from 'src/app/rating-dialog/rating-dialog.component';
import { Movie } from 'src/app/shared/movie';
import { QueryParams } from 'src/app/shared/query-params';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  public movies: Movie[] = []
  public params: QueryParams = new QueryParams()
  public isLoadMoreEnabled: boolean = false

  constructor(
    public moviesService: MoviesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.moviesService.getTop10Movies(this.params)
    this.moviesService.getAllByQuery(this.params).subscribe(result => {
      this.movies = (result && result[1]) ? result[1] : []
    })

    this.moviesService.onQueryChange.subscribe(queryParams => {
      this.params = queryParams
      this.isLoadMoreEnabled = false
      this.loadMovies()
    })
  }

  onOpenRatingModal(movie: Movie) {
    let dialogRef = this.dialog.open(RatingDialogComponent, {data: movie})

    dialogRef.afterClosed().subscribe( async result => {
      if (result) {
        const movie_id = result.movie.id

        const created = await this.moviesService.setRating({
          movie_id,
          rating: result.rating
        }).toPromise()

        if (created) {
          const avgRating = await this.moviesService.getAvgRating({movie_id}).toPromise()
          if (avgRating && avgRating[0])
            this.movies.map(movie => {
              if (movie.id == movie_id)
                movie.avg_rating = avgRating[0].avg_rating;
            })
        }
      }
    })
  }

  onLoadMore() {
    this.params.top10 = false
    this.loadMovies(true)
  }

  loadMovies(loadMore: boolean = false) {
    if (this.params.top10)
      this.isLoadMoreEnabled = false

    this.moviesService.getAllByQuery(this.params).subscribe(result => {
      if (result && result[0]['count']) {
        this.movies = loadMore ? [...this.movies, ...result[1]] : result[1]
        this.params.total = result[0]['count']
        this.params.offset += result[1].length

        this.isLoadMoreEnabled = (this.params.total > this.movies.length && !this.params.top10) ? true : false
      } else {
        this.movies = []
        this.isLoadMoreEnabled = false
      }
    }, error => {
      console.log('ERROR', error)
    })
  }
}
