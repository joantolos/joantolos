import { Component, OnInit } from '@angular/core';

interface ShopConfig {
  shopName: string;
  locale: string;
  prefix: string;
  baseId: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  spread_shop_config: ShopConfig | undefined;

  constructor() { }

  ngOnInit(): void {
    this.spread_shop_config = {
      shopName: 'nadanuevobajoelsol',
      locale: 'es_ES',
      prefix: 'https://nadanuevobajoelsol.myspreadshop.es',
      baseId: 'myShop'
    };
  }

}