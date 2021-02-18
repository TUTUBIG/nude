import {Component, OnInit, SimpleChange} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GoodListResponse, GoodSimpleInfo, WhisperService} from '../../whisper.service';

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
  goods: GoodSimpleInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: WhisperService
  ) { }

  ngOnInit(): void {
    const res = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
          const uid = params.get('uid');
          if (uid == null || uid === '') {
            console.error('uid is empty', uid);
          }
          return this.backend.getCartGoodList(uid);
        }
      )
    );

    res.subscribe(data => {
      const resBody = data as GoodListResponse;
      this.goods = resBody.goods;
      console.log('list: ', resBody.goods);
    });
  }
}
