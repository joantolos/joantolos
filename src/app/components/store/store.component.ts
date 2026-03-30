import { Component, OnInit } from '@angular/core';
import { shopConfig } from '../../../config/config';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  spread_shop_config = shopConfig;

  constructor() { }

  ngOnInit(): void { }

}