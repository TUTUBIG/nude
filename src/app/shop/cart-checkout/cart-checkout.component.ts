import {Component, OnInit, SimpleChange} from '@angular/core';

interface CartGoodInfo {
  name: string;
  price: number;
  count: number;
  image: string;
}

interface SummaryInfo {
  subtotal: number;
  shipDestination: string;
  shipFee: number;
  total: number;
}

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.sass']
})
export class CartCheckoutComponent implements OnInit {
  summary: SummaryInfo = {
    subtotal: 123.23,
    shipDestination: 'Shanghai,China',
    shipFee: 2.32,
    total: 11.21
  };
  goods: CartGoodInfo[] = [
    {
      name: 'I\'m a product',
      price: 30.00,
      count: 6,
      image: 'assets/cart/1.jpg',
    },
    {
      name: 'Face Gloss',
      price: 50.00,
      count: 1,
      image: 'assets/cart/2.png',
    },
    {
      name: 'Satin Powder Blush',
      price: 20.00,
      count: 1,
      image: 'assets/cart/3.png',
    },
  ];

  constructor() { }

  ngOnInit(): void {}
}
