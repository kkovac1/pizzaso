import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { PizzaSize } from '../../models/PizzaSize';
import { Topping } from '../../models/Topping';
import { ConfiguratorService } from '../../services/configurator.service';

@Component({
  selector: 'app-configurator-page',
  templateUrl: './configurator-page.component.html',
  styleUrls: ['./configurator-page.component.scss']
})
export class ConfiguratorPageComponent implements OnInit {

  public toppings$: Observable<Topping[]>;
  public pizzaSizes$: Observable<PizzaSize[]>

  public pizzaSizes: Observable<any> = of([
    { name: "S", price: 5, active: false },
    { name: "M", price: 10, active: false },
    { name: "L", price: 15, active: false },
  ])

  public activeSize = "S";
  public toppingsTotalPrice: number = 0;
  public selectedToppings: Topping[] = [];
  public pizzaSizePrice: number = 5;


  constructor(
    private configuratorService: ConfiguratorService
  ) {
    this.toppings$ = this.configuratorService.getToppings();
    this.pizzaSizes$ = this.configuratorService.getPizzaSizes();
    // fbs.collection("toppings").doc("corn").set({
    //   id: 3, name: "Corn", price: 1, icon: "🌽"
    // });

  }


  ngOnInit(): void {
  }

  public selectTopping(topping: Topping) {
    var index = this.selectedToppings.indexOf(topping);
    if (index !== -1) {
      this.selectedToppings.splice(index, 1);
      this.toppingsTotalPrice -= topping.price;
    }
    else {
      this.selectedToppings.push(topping);
      this.toppingsTotalPrice += topping.price;
    }
  }

  public setupActiveSize(pizza: PizzaSize) {
    this.activeSize = pizza.name;
    this.pizzaSizePrice = pizza.price;
    
  }


}
