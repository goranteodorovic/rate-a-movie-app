import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie'

@Component({
  selector: 'app-homme',
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.scss']
})
export class HommeComponent implements OnInit {

  public movies: Movie[] = []

  constructor() {
  }

  async ngOnInit(): Promise<void> {}
}
