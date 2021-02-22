import {Component, OnInit, SimpleChange} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CartGoodInfo, CartGoodListResponse, CheckoutRequest, GoodListResponse, GoodSimpleInfo, WhisperService} from '../../whisper.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';



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
    shipFee: 0,
    total: 11.21
  };
  cartGoods: CartGoodInfo[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: WhisperService,
    public dialog: MatDialog
  ) { }

  updateDestinationDialog(): void {
    const dialogRef = this.dialog.open(UpdateDestinationDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.summary.shipDestination = result;
      }
    });
  }

  checkout(): void {
    const ids = [];
    for (const good of this.cartGoods) {
      ids.push(good.id);
    }
    const req: CheckoutRequest = {
      cart_ids: ids,
      destination: this.summary.shipDestination,
    };
    this.backend.checkout(req).subscribe();
  }

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
      const resBody = data as CartGoodListResponse;
      this.cartGoods = resBody.goods;
      console.log('list: ', resBody.goods);
    });
  }
}

@Component({
  selector: 'app-update-destination',
  templateUrl: 'update-destination.html',
})
export class UpdateDestinationDialogComponent {
  destination = 'cn';

  constructor(
    public dialogRef: MatDialogRef<UpdateDestinationDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
