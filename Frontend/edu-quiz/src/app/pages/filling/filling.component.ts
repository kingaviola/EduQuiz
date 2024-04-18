import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-filling',
  templateUrl: './filling.component.html',
  styleUrls: ['./filling.component.scss']
})
export class FillingComponent {
  data: any;

  constructor(private router: Router) {
    this.data = this.router.getCurrentNavigation()?.extras?.state?.['data'];
  }

}
