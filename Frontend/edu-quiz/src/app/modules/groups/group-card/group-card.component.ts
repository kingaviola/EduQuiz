import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GroupCard } from 'src/app/models/qroup-card.model';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss']
})
export class GroupCardComponent {
  @Input() groupCard: GroupCard = new GroupCard("", "", 0, "", "", "", "");

  constructor(private router: Router) {}

  selectGroup() {
    const navExtras: NavigationExtras = {state: {data: this.groupCard.id}};
    this.router.navigate(['/groups/details'], navExtras);
  }

}
