import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private api = 'http://localhost:9000/api'
  public onQueryChange: EventEmitter<any>;
  private headers = { authorization : 'No worries' }

  constructor(private http: HttpClient) {
    this.onQueryChange = new EventEmitter()
  }

  getAllByQuery(params = {}) {
    return this.http.get<any[]>(this.api + '/movies', {params: params, headers: this.headers})
  }

  setRating(params = {}) {
    return this.http.put<any[]>(this.api + '/ratings/add', {params: params}, {headers: this.headers})
  }

  getAvgRating(params = {}) {
    return this.http.get<any[]>(this.api + '/ratings/average', {params: params, headers: this.headers})
  }
}
