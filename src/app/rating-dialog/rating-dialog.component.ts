import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {
  rating: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    ) {
      this.rating = 0
    }

  ngOnInit(): void {}

  onRatingSet(rating: any) {
    this.rating = rating
  }

  submit() {
    this.dialogRef.close({
      movie: this.data,
      rating: this.rating
    })
  }

  close() {
    this.dialogRef.close()
  }
}
