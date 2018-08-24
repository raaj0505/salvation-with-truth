import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import {PersonListComponent} from '@app/static/person-list/person-list.component';
import {FilterPipe} from '@app/core/filters/filter.pipe';
import {AddNewComponent} from '@app/core/add-new/add-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@app/material/material.module';

@NgModule({
  imports: [SharedModule, StaticRoutingModule,  FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [AboutComponent, FeaturesComponent, PersonListComponent, FilterPipe, AddNewComponent],
  entryComponents: [AddNewComponent, PersonListComponent]
})
export class StaticModule {}
