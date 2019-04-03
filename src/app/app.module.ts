import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material';
import { TransactionPageComponent } from './user/transaction-page/transaction-page.component';
import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {AddMobileMoneyDialogComponent} from './admin/dashboard/configureMomo/add-momo.component'
import {EditMobileMoneyDialogComponent} from './admin/dashboard/configureMomo/edit-momo.component'
import {DeleteMobileMoneyDialogComponent} from './admin/dashboard/configureMomo/delete-momo.component'
import { DashboardComponent} from './admin/dashboard/dashboard.component'
import {AdminDashboardComponent} from './admin/dashboard/admin.dashboard.component'
import {ConfigurationsComponent} from './admin/dashboard/configurations/configurations.component'
import {TransactionsComponent} from './admin/dashboard/transactions/transactions.component'
import {ConfigureMobileMoneyComponent} from './admin/dashboard/configureMomo/configureMomo.component'
import { AddConfigurationComponent} from './admin/dashboard/configurations/add-configuration.component'
import {LoginDialogComponent} from './home/login.component'
import {SignupDialogComponent} from './home/signup.component'
import { UserComponent } from './user/user.component'
import {ViewTransactionComponent} from './user/view-transaction/view-transaction.component'
import { MatOption } from '@angular/material';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ".",
  precision: 2,
  prefix: " ",
  suffix: "",
  thousands: ",",
  nullable: true
};
@NgModule({
  declarations: [
    AppComponent,
    TransactionPageComponent,
    HomeComponent,
    AddMobileMoneyDialogComponent,
    EditMobileMoneyDialogComponent,
    DeleteMobileMoneyDialogComponent,
    DashboardComponent,
    AddConfigurationComponent,
    AdminDashboardComponent,ConfigureMobileMoneyComponent, TransactionsComponent, ConfigurationsComponent,
   LoginDialogComponent,SignupDialogComponent,UserComponent,ViewTransactionComponent   
  ],
  entryComponents:[
    AddMobileMoneyDialogComponent,
    EditMobileMoneyDialogComponent,
    DeleteMobileMoneyDialogComponent,
    LoginDialogComponent,
    SignupDialogComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
