import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dialog } from '../../models/Dialog';
import { Topping } from '../../models/Topping';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public dialog$: Observable<Dialog>;

  constructor(
    private dialogService: DialogService
  ) {
    this.dialog$ = this.dialogService.dialog$;
  }

  ngOnInit(): void {
  }

  displayToppings(toppings?: Topping[]) {
    if (toppings) return toppings.map(value => value.name).join(", ");
    else return "";
  }

  close() {
    this.dialogService.close();
  }
}
