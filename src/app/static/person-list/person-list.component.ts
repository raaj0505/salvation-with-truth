import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, Sort} from '@angular/material';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AddNewComponent} from '@app/core/add-new/add-new.component';
import {environment} from '@env/environment';
import {PersonDataService} from '@app/services/person-data.service';
import {UserService} from '@app/core/auth/user.service';


export interface DeadPerson {
  id: string;
  imageUrl: string;
  name: string;
  causeOfDeath: string;
  wikiUrl: string;
  dateOfDeath: Date;
}

export let newPerson = {
  id: null,
  imageUrl: '',
  name: '',
  causeOfDeath: '',
  wikiUrl: '',
  dateOfDeath: null
};



@Component({
  selector: 'anms-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  itemValue: DeadPerson = Object.assign({} , newPerson);
  data: DeadPerson;
  loggedIn: boolean;

  sourceData: DeadPerson[];
  searchText = '';

  sortedData: DeadPerson[];
  sortDefault = {
    sortActive: 'dateOfDeath',
    sortDirection: 'asc'
  };

  constructor(public dialog: MatDialog, private personDataService: PersonDataService, private userService: UserService) {
    this.personDataService.getItems().subscribe(data => {
      this.sourceData = data;
      this.sortedData = this.sourceData.slice();
    });
  }

  ngOnInit() {
    this.userService.isUserAuthenticated().subscribe(user => {
      this.loggedIn = !!user;
    });
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
        default: return a[this.sortDefault.sortActive];
      }

    });
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialog(action): void {
    const dialogRef = this.dialog.open(AddNewComponent, { width: '80%', height: '80%', data: this.itemValue, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.dateOfDeath && action === 'addNew') {
       this.addNewItem(result);
      } else if (result && result.name && result.dateOfDeath && action === 'edit') {
        this.editItem(result);
      }
      this.itemValue = Object.assign({}, newPerson);
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
  addNewItem(result): void {
    this.personDataService.createNewItem(result).then(response => {
      console.log('successfully added');
      this.itemValue = Object.assign({} , newPerson);
    })
      .catch(err => {
        console.error('Error while adding item: ', err);
      });
  }
  editItem(result): void {
    this.personDataService.updateItem(result).then(response => {
      console.log('successfully updated: ');
    })
      .catch(err => {
        console.error('Error while updating item: ', err);
      });
    this.itemValue = Object.assign({} , newPerson);
  }
  openEditDialog(person) {
    this.itemValue = person;
    this.openDialog('edit');
  }

  delete(person) {
    this.personDataService.deleteItem(person.id).then(response =>{
      console.log('Succefffully deleted');
    }).catch(err => {
      console.error('error while deletion: ', err);
    });
  }
}
