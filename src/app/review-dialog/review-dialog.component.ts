import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DialogData {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
}

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ReviewDialogComponent> ) { }

  index: string[] = ["0", "1", "2", "3", "4", "5"];
  selected: string;

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onValidClick(idInput, commentInput): void {
    let data = {
      id: idInput,
      note: this.selected,
      comment: commentInput
    }
    this.dialogRef.close(data);
  }
  
  ngOnInit() {
  }

}
