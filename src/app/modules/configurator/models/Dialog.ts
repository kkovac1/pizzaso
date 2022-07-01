import { Order } from "./Order";

export interface Dialog {
    open: boolean;
    data?: Order
}