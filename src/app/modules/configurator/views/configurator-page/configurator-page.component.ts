import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-configurator-page',
  templateUrl: './configurator-page.component.html',
  styleUrls: ['./configurator-page.component.scss']
})
export class ConfiguratorPageComponent implements OnInit {

  public toppings: Observable<any> = of([
    { name: "Egg", price: 1, icon: "🥚" },
    { name: "Chilli", price: 1, icon: "🌶" },
    { name: "Corn", price: 1, icon: "🌽" },
    { name: "Shrooms", price: 2, icon: "🍄" },
  ]);
  public pizzaSizes: Observable<any> = of([
    { name: "S", active: false },
    { name: "M", active: false },
    { name: "L", active: false },
  ])
  public toppingsTotalPrice: number = 0;
  public selectedToppings: { name: string, price: number }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public selectTopping(topping: { name: string, price: number }) {
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

  

}
