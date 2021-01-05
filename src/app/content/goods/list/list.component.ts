import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  images = ['assets/goods/list/1.webp', 'assets/goods/list/2.webp', 'assets/goods/list/3.webp', 'assets/goods/list/4.webp', 'assets/goods/list/5.webp', 'assets/goods/list/6.webp', 'assets/goods/list/7.webp'];

  constructor() { }

  ngOnInit(): void {
  }

}
