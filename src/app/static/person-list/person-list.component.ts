import {Component, OnInit} from '@angular/core';
import {MatDialog, Sort} from '@angular/material';
import {Observable} from 'rxjs';
import {AngularFirestore} from 'angularfire2/firestore';
import {AddNewComponent} from '@app/core/add-new/add-new.component';


export interface DeadPerson {
  imageUrl: string;
  name: string;
  causeOfDeath: string;
  dateOfDeath: Date;
}

export let newPerson = {
  imageUrl: '',
  name: '',
  causeOfDeath: '',
  dateOfDeath: null
};



@Component({
  selector: 'anms-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  itemValue: DeadPerson = newPerson;
  items: Observable<any[]>;
  data: DeadPerson;

  sourceData: DeadPerson[];
  searchText = '';

  sortedData: DeadPerson[];

  constructor(public db: AngularFirestore, public dialog: MatDialog) {
    this.items = db.collection('items').valueChanges();
    this.items.subscribe(data => {
      this.sourceData = data;
      this.sortedData = this.sourceData.slice();
      console.log(data);
    });
  }

  ngOnInit() {
  }

  sortData(sort: Sort) {
    const data = this.sourceData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {

      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'causeOfDeath': return this.compare(a.causeOfDeath, b.causeOfDeath, isAsc);
        case 'dateOfDeath': return this.compare(a.dateOfDeath, b.dateOfDeath, isAsc);
        default: return 0;
      }

    });
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddNewComponent, { width: '80%', height: '80%', data: this.itemValue, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed with data: ', result);
      if (result && result.name && result.dateOfDeath) {
        this.db.collection('/items').add(result);
      }
    });
  }
  getCauses(causeOfDeath) {
    return causeOfDeath.split(',');
  }
  getChipColor(i) {
    return (i % 2 === 0 ? 'accent' : 'primary');
  }
  filterByCause (cause) {
    this.searchText = cause;
  }
}
