import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Order } from '../../models/Order';
import { Topping } from '../../models/Topping';
import { ConfiguratorService } from '../../services/configurator.service';
import { ToastrService } from 'ngx-toastr';

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
    private auth: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    formBuilder: UntypedFormBuilder
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
    return this.orderForm?.value?.totalPrice;
  }

  getDiscount(code: string) {
    this.configuratorService.getDiscount(code).subscribe(res => {
      if (res) this.orderForm!.get('discount')?.setValue(res);
      else window.alert("Code doesn't exist.")
    });
  }

  finishOrder() {
    this.orderForm?.get('orderedAt')?.setValue(new Date());
    this.auth.user$.pipe(
    ).subscribe((user) => {
      if (user) {
        this.configuratorService.saveOrderData(this.orderForm?.value!, user.uid);
        this.toastrService.success("Order successful!");
      }
      this.router.navigate(['configurator/order-successful']);
    });

  }
}
