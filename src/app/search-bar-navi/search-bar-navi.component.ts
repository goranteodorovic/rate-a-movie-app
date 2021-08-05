import { Component, OnInit, EventEmitter } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { MOVIE_TYPES } from '../shared/const'
import { QueryParams } from '../shared/query-params';
import { debounce } from 'lodash';

@Component({
  selector: 'app-search-bar-navi',
  templateUrl: './search-bar-navi.component.html',
  styleUrls: ['./search-bar-navi.component.scss']
})
export class SearchBarNaviComponent implements OnInit {

  public searchInput: any
  public isMovieType: boolean = true
  public params: QueryParams = new QueryParams()

  constructor(public moviesService: MoviesService) {
    this.onInputChange = debounce(this.onInputChange, 700)
  }

  ngOnInit(): void {}

  onInputChange(event: Event) {
    const searchInput = this.searchInput = (<HTMLInputElement>event.target).value
    this.params = new QueryParams()

    if (searchInput.length >= 2) {
      this.params.typeId = null
      this.params.text = searchInput
      this.moviesService.onQueryChange.emit(this.params)
    } else if (!searchInput.length) {
      this.params.typeId = this.isMovieType ? MOVIE_TYPES['MOVIE'] : MOVIE_TYPES['TVSHOW']
      this.moviesService.onQueryChange.emit(this.params)
    }
  }

  onLoadTop10() {
    this.searchInput = ''
    this.params = new QueryParams()
    this.isMovieType = !this.isMovieType
    this.params.typeId = this.isMovieType ? MOVIE_TYPES['MOVIE'] : MOVIE_TYPES['TVSHOW']
    this.params.top10 = true
    this.moviesService.onQueryChange.emit(this.params)
  }

  onLoadAll() {
    this.searchInput = ''
    this.params = new QueryParams()
    this.params.typeId = null
    this.moviesService.onQueryChange.emit(this.params)
  }
}
