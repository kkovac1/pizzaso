import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IFormGroup } from '@rxweb/types';
import { BehaviorSubject, from, map, Observable, shareReplay } from 'rxjs';
import { Discount } from '../models/Discount';
import { Order } from '../models/Order';
import { PizzaSize } from '../models/PizzaSize';
import { Topping } from '../models/Topping';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  private orderData: BehaviorSubject<IFormGroup<Order> | null> = new BehaviorSubject<IFormGroup<Order> | null>(null);
  public orderData$: Observable<IFormGroup<Order> | null> = this.orderData.asObservable();

  constructor(
    private afs: AngularFirestore,
    private toastrService: ToastrService
  ) {
  }

  sendOrderForm(data: IFormGroup<Order>) {
    this.orderData.next(data);
  }

  getToppings(): Observable<Topping[]> {
    return this.afs.collection<Topping>('toppings').valueChanges().pipe(
      shareReplay(1),
    );
  }

  getPizzaSizes(): Observable<PizzaSize[]> {
    return this.afs.collection<PizzaSize>('pizza-sizes').valueChanges().pipe(
      shareReplay(1),
      map((res) => res.sort((a, b) => a.price - b.price))
    );
  }

  getDiscount(code: string): Observable<Discount | undefined> {
    return this.afs.doc<Discount>(`discount-codes/${code}`).valueChanges();
  }
  
  saveOrderData(order: Order, uid: string) {
    let documentId = this.afs.createId();
    this.afs.doc(`order-history/orders/${uid}/${documentId}`).set(order);
  }

  getUserOrderHistory(uid: string) {
    return this.afs.collection<Order>(`order-history/orders/${uid}`).valueChanges();
  }
}
