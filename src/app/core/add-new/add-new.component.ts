import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeadPerson} from '@app/static/person-list/person-list.component';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  maxDate = new Date();
  constructor(public dialogRef: MatDialogRef<AddNewComponent>, @Inject(MAT_DIALOG_DATA) public data: DeadPerson) { }
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

