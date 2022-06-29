import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { PizzaSize } from '../models/PizzaSize';
import { Topping } from '../models/Topping';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  constructor(
    private afs: AngularFirestore
  ) {
    
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
      map((res)=> res.sort((a, b) => a.price - b.price))
    );
  }

  getDiscount(code: string): Observable<any> {
    return this.afs.doc<any>(`discount-codes/${code}`).valueChanges();

  }
}
