import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userId = '';
  className = '';

  constructor() {}

  setUserId(userId: string) {
    this.userId = userId;
    this.className = '';
  }

  setClassName(className: string) {
    this.className = className;
    this.userId = '';
  }
}
