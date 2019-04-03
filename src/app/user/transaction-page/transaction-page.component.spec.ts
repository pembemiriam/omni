import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPageComponent } from './transaction-page.component';

import {MaterialModule } from './../../material'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('TransactionPageComponent', () => {
  let component: TransactionPageComponent;
  let fixture: ComponentFixture<TransactionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionPageComponent ],
      imports :[MaterialModule, FormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPageComponent);
    component = fixture.componentInstance;
   // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
