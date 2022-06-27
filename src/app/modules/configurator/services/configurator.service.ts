import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { PizzaSize } from '../models/PizzaSize';
import { Topping } from '../models/Topping';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  constructor(
    private fbs: AngularFirestore
  ) {
    
  }

  getToppings(): Observable<Topping[]> {
    return this.fbs.collection<Topping>("toppings").valueChanges().pipe(
      shareReplay(1),
      tap(res => console.log(res))
    );
  }

  getPizzaSizes(): Observable<PizzaSize[]> {
    return this.fbs.collection<PizzaSize>("pizza-sizes").valueChanges().pipe(
      shareReplay(1),
      map((res)=> res.sort((a, b) => a.price - b.price))
    );
  }
}
