import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-resto-dialog',
  templateUrl: './new-resto-dialog.component.html',
  styleUrls: ['./new-resto-dialog.component.scss']
})
export class NewRestoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewRestoDialogComponent>) { }

  index: string[] = ["0", "1", "2", "3", "4", "5"];
  selected: string;
  adress: string;

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onValidClick(restoNameInput): void {
    console.log(">>> Test get Data --> restoName = ", restoNameInput, " note = ", this.selected);
    let data = {
      restoName: restoNameInput,
      note: this.selected
    }
    this.dialogRef.close(data);
  }

  ngOnInit() {
  }

}
