import {Pipe, PipeTransform} from '@angular/core';
import {DeadPerson} from '@app/static/person-list/person-list.component';


@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: DeadPerson[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.name.toLowerCase().includes(searchText) ||
        it.causeOfDeath.toLowerCase().includes(searchText) ||
        new Date(it.dateOfDeath).toDateString().toLowerCase().includes(searchText);
    });
  }
}
