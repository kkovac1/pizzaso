import { Component, Input, OnInit } from '@angular/core';
import { Topping } from '../../models/Topping';

@Component({
  selector: 'app-topping',
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.scss']
})
export class ToppingComponent implements OnInit {

  @Input()
  public topping!: Topping;

  @Input()
  public selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
