import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Order } from '../../models/Order';
import { ConfiguratorService } from '../../services/configurator.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.scss']
})
export class OrderHistoryPageComponent implements OnInit {

  public orders$: Observable<Order[]>;

  constructor(
    private configuratorService: ConfiguratorService,
    private authService: AuthService,
    private dialogService: DialogService

  ) {
    this.orders$ = this.authService.user$.pipe(
      switchMap(user => {
        if (user) return this.configuratorService.getUserOrderHistory(user.uid).pipe(
          map(res => {
            return res.sort((a, b) => b.orderedAt - a.orderedAt)
          })
        );
        else return of([]);
      })
    )
  }

  ngOnInit(): void {
  }

  openDialog(order: Order) {    
    this.dialogService.open(order);
  }

}
