import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { Observable } from 'rxjs';
import { PizzaSize } from '../../models/PizzaSize';
import { Topping } from '../../models/Topping';
import { ConfiguratorService } from '../../services/configurator.service';

@Component({
  selector: 'app-configurator-page',
  templateUrl: './configurator-page.component.html',
  styleUrls: ['./configurator-page.component.scss']
})
export class ConfiguratorPageComponent implements OnInit {

  private formBuilder: IFormBuilder;
  public orderForm: IFormGroup<any>;

  public toppings$: Observable<Topping[]>;
  public pizzaSizes$: Observable<PizzaSize[]>

  public activeSize = "S";
  public toppingsTotalPrice: number = 0;
  public selectedToppings: Topping[] = [];
  public pizzaSizePrice: number = 5;

  public discount = 0;

  constructor(
    private configuratorService: ConfiguratorService,
    formBuilder: FormBuilder
  ) {
    this.formBuilder = formBuilder;
    this.orderForm = this.formBuilder.group<any>({
      quantity: [1],
      pizzaSize: ['M'],
      toppings: [""]
    });

    this.toppings$ = this.configuratorService.getToppings();
    this.pizzaSizes$ = this.configuratorService.getPizzaSizes();
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

  getDiscount(code: string) {
    this.configuratorService.getDiscount(code).subscribe(res => {
      if (res) this.discount = res.percentage / 100;
      else window.alert("Code doesn't exist")
    });
  }
}
