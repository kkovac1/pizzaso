import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessfulPageComponent } from './order-successful-page.component';

describe('OrderSuccessfulPageComponent', () => {
  let component: OrderSuccessfulPageComponent;
  let fixture: ComponentFixture<OrderSuccessfulPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSuccessfulPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessfulPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
