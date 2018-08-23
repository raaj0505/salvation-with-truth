import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {DeadPerson} from '@app/static/person-list/person-list.component';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {
  itemCollections: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) { }
  getItems(): Observable<any[]> {
    return  this.db.collection('items').valueChanges();
  }
  createNewItem(data: DeadPerson) {
    data.id = this.db.createId();
    return this.db.collection('items').doc(data.id).set(data);
  }
  getItem(key: string): Observable<any> {
    return  this.db.collection('items').doc(key).valueChanges();
  }
  updateItem(data: DeadPerson) {
    return  this.db.collection('items').doc(data.id).update(data);
  }
  deleteItem(key: string) {
    return  this.db.collection('items').doc(key).delete();
  }
}
