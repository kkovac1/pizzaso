import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IFormArray, IFormBuilder, IFormGroup } from '@rxweb/types';
import { Observable } from 'rxjs';
import { Discount } from '../../models/Discount';
import { Order } from '../../models/Order';
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

  public toppings$: Observable<Topping[]>;
  public pizzaSizes$: Observable<PizzaSize[]>
  public orderForm: IFormGroup<Order>;
  public activeSize = "S";
  public selectedToppings: Topping[] = [];

  constructor(
    private configuratorService: ConfiguratorService,
    formBuilder: FormBuilder
  ) {
    this.formBuilder = formBuilder;
    this.orderForm = this.formBuilder.group<Order>({
      quantity: [1, Validators.min(1)],
      pizzaSize: this.formBuilder.group<PizzaSize>({ name: "S", price: 5 }),
      toppings: this.formBuilder.array<Topping>([]),
      discount: this.formBuilder.group<Discount>({ code: "", active: true, percentage: 0 }),
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      county: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      orderedAt: null,
      totalPrice: [0]
    });

    this.toppings$ = this.configuratorService.getToppings();
    this.pizzaSizes$ = this.configuratorService.getPizzaSizes();
  }

  ngOnInit(): void {
  }

  public get toppingsArray(): IFormArray<Topping> {
    return this.orderForm.get('toppings') as IFormArray<Topping>;
  }

  public selectTopping(topping: Topping) {
    var index = this.selectedToppings.indexOf(topping);
    if (index !== -1) {
      this.selectedToppings.splice(index, 1);
      this.toppingsArray.removeAt(this.toppingsArray.value.findIndex(top => top.name == topping.name));
    }
    else {
      this.selectedToppings.push(topping);
      this.toppingsArray.push(this.formBuilder.group<Topping>({ name: topping.name, price: topping.price, icon: topping.icon }));
    }

  }

  public setupActiveSize(pizza: PizzaSize) {
    this.activeSize = pizza.name;
    this.orderForm.get('pizzaSize')?.setValue(pizza);
  }

  getDiscount(code: string) {
    this.configuratorService.getDiscount(code).subscribe(res => {
      if (res) this.orderForm.get('discount')?.setValue(res);
      else window.alert("Code doesn't exist.")
    });
  }

  public get toppingsPrice() {
    return this.toppingsArray.value.reduce((acc, cur) => acc + cur.price, 0);
  }

  public get totalPrice() {
    var toppingsTotalPrice = this.toppingsArray.value.reduce((acc, cur) => acc + cur.price, 0);
    var pizzaPrice = this.orderForm.get('pizzaSize')?.value?.price!;
    var discount = this.orderForm.get('discount')?.value?.percentage! / 100;
    var quantity = this.orderForm?.get('quantity')?.value!;
    var totalPrice = ((toppingsTotalPrice + pizzaPrice) - (toppingsTotalPrice + pizzaPrice) * discount) * quantity;

    return totalPrice;
  }

  goToOrderDetails() {
    this.orderForm.get('totalPrice')?.setValue(this.totalPrice);
    this.configuratorService.sendOrderForm(this.orderForm);
    // this.configuratorService.sendOrderData(this.orderForm.value!);
  }

}
