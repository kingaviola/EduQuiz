import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { GroupsDetailsComponent } from './groups-details/groups-details.component';
import { GroupsRoutingModule } from '../groups-routing.module';
import { GroupCardComponent } from './group-card/group-card.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    GroupsComponent,
    GroupsDetailsComponent,
    GroupCardComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule
  ]
})
export class GroupsModule { }
