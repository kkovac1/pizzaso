import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Dialog } from '../models/Dialog';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialog = new BehaviorSubject<Dialog>({ open: false });
  public dialog$: Observable<Dialog> = this.dialog.asObservable();

  constructor() { }

  open(data: Order) {
    this.dialog.next({ open: true, data: data });
  }

  close() {
    this.dialog.next({ open: false });
  }
}