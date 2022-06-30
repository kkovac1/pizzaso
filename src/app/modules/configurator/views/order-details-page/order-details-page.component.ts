import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { Order } from '../../models/Order';
import { Topping } from '../../models/Topping';
import { ConfiguratorService } from '../../services/configurator.service';

@Component({
  selector: 'app-order-details-page',
  templateUrl: './order-details-page.component.html',
  styleUrls: ['./order-details-page.component.scss']
})
export class OrderDetailsPageComponent implements OnInit {

  private formBuilder: IFormBuilder;

  public orderData$ = this.configuratorService.orderData$;

  // public orderData: Order | null = null;

  public orderForm: IFormGroup<Order> | null = null;

  constructor(
    private configuratorService: ConfiguratorService,
    private router: Router,
    formBuilder: FormBuilder
  ) {
    this.formBuilder = formBuilder;
    this.configuratorService.orderData$.subscribe(res => {
      if (res) {
        this.orderForm = res;
      }
    })
  }

  ngOnInit(): void {

  }

  displayToppings(toppings: Topping[]) {
    return toppings.map(value => value.name).join(", ");
  }

  calculateTotalPrice(orderData: Order) {
    var toppingsTotalPrice = orderData.toppings.reduce((acc, cur) => acc + cur.price, 0);
    var pizzaPrice = orderData.pizzaSize.price;
    var discount = orderData.discount.percentage / 100;
    var totalPrice = (toppingsTotalPrice + pizzaPrice) - (toppingsTotalPrice + pizzaPrice) * discount;
    return totalPrice;
  }

  public get totalPrice() {
    var toppingsTotalPrice = this.orderForm!.get('toppings')!.value!.reduce((acc, cur) => acc + cur.price, 0);
    var pizzaPrice = this.orderForm?.get('pizzaSize')?.value?.price!;
    var discount = this.orderForm?.get('discount')?.value?.percentage! / 100;
    var quantity = this.orderForm?.get('quantity')?.value!;
    var totalPrice = ((toppingsTotalPrice + pizzaPrice) - (toppingsTotalPrice + pizzaPrice) * discount) * quantity;

    return totalPrice;
  }

  getDiscount(code: string) {
    this.configuratorService.getDiscount(code).subscribe(res => {
      if (res) this.orderForm!.get('discount')?.setValue(res);
      else window.alert("Code doesn't exist.")
    });
  }

  finishOrder() {
    console.log(this.orderForm!.value);
    this.configuratorService.saveOrderData(this.orderForm?.value!).then(() => {
      this.router.navigate(['configurator/order-successful']);
    });

  }
}
