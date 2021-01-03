import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  banners = ['assets/banner/1.webp', 'assets/banner/2.webp', 'assets/banner/3.webp'];

  constructor() { }

  ngOnInit(): void {
  }

}
