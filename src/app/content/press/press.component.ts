import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.sass']
})
export class PressComponent implements OnInit {
  images = ['assets/press/1.png', 'assets/press/2.png', 'assets/press/3.png', 'assets/press/4.png', 'assets/press/5.png', 'assets/press/6.png', 'assets/press/7.png', 'assets/press/8.png', 'assets/press/9.png'];

  constructor() { }

  ngOnInit(): void {
  }

}
