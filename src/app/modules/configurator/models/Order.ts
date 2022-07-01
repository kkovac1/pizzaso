import { Timestamp } from "rxjs";
import { Discount } from "./Discount";
import { PizzaSize } from "./PizzaSize";
import { Topping } from "./Topping";

export interface Order {
    toppings: Topping[];
    pizzaSize: PizzaSize;
    quantity: number;
    discount: Discount;
    street: string;
    city: string;
    postalCode: string;
    county: string;
    orderedAt: Date | any;
    totalPrice: number;
}