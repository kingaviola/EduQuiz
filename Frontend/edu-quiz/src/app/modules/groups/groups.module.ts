import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { GroupsDetailsComponent } from './groups-details/groups-details.component';
import { GroupsRoutingModule } from '../groups-routing.module';



@NgModule({
  declarations: [
    GroupsComponent,
    GroupsDetailsComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
