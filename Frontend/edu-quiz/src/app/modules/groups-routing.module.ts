import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './groups/groups/groups.component';
import { GroupsDetailsComponent } from './groups/groups-details/groups-details.component';

const routes: Routes = [
  { path: '', component: GroupsComponent, children: [
    { path: 'details', component: GroupsDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
