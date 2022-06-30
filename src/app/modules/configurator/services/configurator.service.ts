import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IFormGroup } from '@rxweb/types';
import { BehaviorSubject, map, Observable, shareReplay, Subject, tap } from 'rxjs';
import { Discount } from '../models/Discount';
import { Order } from '../models/Order';
import { PizzaSize } from '../models/PizzaSize';
import { Topping } from '../models/Topping';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  // private orderData: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(null);
  // public orderData$: Observable<Order | null> = this.orderData.asObservable();

  private orderData: BehaviorSubject<IFormGroup<Order> | null> = new BehaviorSubject<IFormGroup<Order> | null>(null);
  public orderData$: Observable<IFormGroup<Order> | null> = this.orderData.asObservable();

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth
  ) {
    this.orderData$.subscribe(res => {
      console.log(res);

    })
  }

  // sendOrderData(data: Order) {
  //   this.orderData.next(data);
  // }

  sendOrderForm(data: IFormGroup<Order>) {
    this.orderData.next(data);
  }

  getToppings(): Observable<Topping[]> {
    return this.afs.collection<Topping>('toppings').valueChanges().pipe(
      shareReplay(1),
      tap(res => console.log(res))
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

  saveOrderData(order: Order) {
    let documentId = this.afs.createId();
    return this.afs.doc(`order-history/orders/username/${documentId}`).set(order);
  }
}
