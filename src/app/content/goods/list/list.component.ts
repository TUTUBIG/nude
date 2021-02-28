import { Component, OnInit } from '@angular/core';
import { GoodListResponse, GoodSimpleInfo, WhisperService} from '../../../whisper.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

const defaultCategory = 'eyes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: WhisperService
  ) { }

  goodList: GoodSimpleInfo[] = [];

  addCart(skuId: string, quantities: number): void {
    this.backend.addCart(skuId, quantities).subscribe();
  }

  ngOnInit(): void {
    const res = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let category = params.get('category');
        if (category == null) {
          category = defaultCategory;
        }
        return this.backend.getGoodList(category);
      }
    )
    );

    res.subscribe(data => {
      const resBody = data as GoodListResponse;
      this.goodList = resBody.goods;
      // tslint:disable-next-line:forin
      for (const i in this.goodList) {
        this.goodList[i].quantities = 1;
      }
      console.log('list: ', resBody.goods);
  });
}

// tslint:disable-next-line:max-line-length
// images = ['assets/goods/list/1.webp', 'assets/goods/list/2.webp', 'assets/goods/list/3.webp', 'assets/goods/list/4.webp', 'assets/goods/list/5.webp', 'assets/goods/list/6.webp', 'assets/goods/list/7.webp'];

}
