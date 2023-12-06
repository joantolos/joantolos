import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['subscribed']) this.dialog.open(SubscribedDialog);
    });
  }
}

@Component({
  selector: 'subscribed-dialog',
  templateUrl: 'subscribed-dialog.html',
})
export class SubscribedDialog {}
