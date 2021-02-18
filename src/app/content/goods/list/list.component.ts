import { Component, OnInit } from '@angular/core';
import {GoodListRequest, GoodListResponse, GoodSimpleInfo, WhisperService} from '../../../whisper.service';
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

  ngOnInit(): void {
    const resBody = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let category = params.get('category');
        if (category == null) {
          category = defaultCategory;
        }
        console.log('category', category);
        const req: GoodListRequest = {
          category,
        };
        return this.backend.getGoodList(req);
      }
    )
    );

    resBody.subscribe(data => {
      console.log(data);
      const res = data as GoodListResponse;
      this.goodList = res.goods;
      console.log('list: ', res.goods);
  });
}

// tslint:disable-next-line:max-line-length
// images = ['assets/goods/list/1.webp', 'assets/goods/list/2.webp', 'assets/goods/list/3.webp', 'assets/goods/list/4.webp', 'assets/goods/list/5.webp', 'assets/goods/list/6.webp', 'assets/goods/list/7.webp'];

}
