import { Component, OnInit } from '@angular/core';

interface Carousel {
  name: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  banners = ['assets/banner/1.webp', 'assets/banner/2.webp', 'assets/banner/3.webp'];
  products: Carousel[] = [
    {
      name: 'Brush Set',
      price: 17.00,
      imageUrl: 'assets/carousel/1.webp',
    },
    {
      name: 'Face Gloss',
      price: 50.00,
      imageUrl: 'assets/carousel/2.webp',
    },
    {
      name: 'Satin Powder Blush',
      price: 20.00,
      imageUrl: 'assets/carousel/3.webp',
    },
    {
      name: 'Matte Lipstick',
      price: 27.00,
      imageUrl: 'assets/carousel/4.webp',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
