import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionPageComponent } from './user/transaction-page/transaction-page.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent} from './admin/dashboard/dashboard.component'
import {AdminDashboardComponent} from './admin/dashboard/admin.dashboard.component'
import {ConfigurationsComponent} from './admin/dashboard/configurations/configurations.component'
import {TransactionsComponent} from './admin/dashboard/transactions/transactions.component'
import {ConfigureMobileMoneyComponent} from './admin/dashboard/configureMomo/configureMomo.component'
import { AddConfigurationComponent } from './admin/dashboard/configurations/add-configuration.component';
import {UserComponent} from './user/user.component'
import {ViewTransactionComponent} from './user/view-transaction/view-transaction.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', component: DashboardPageComponent },
  {
    path : 'home', 
    component:HomeComponent
  },

  // Routes for the admin section
  {
    path:'dashboard',
    component :  DashboardComponent,
    children:[
      {
        path:'',
        pathMatch:'full',
        component:AdminDashboardComponent,
        data:{title: 'Dashboard'}
      },
      {
        path:'configureMomo',
        component: ConfigureMobileMoneyComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      },
      {
        path:'configurations',
        children:[
          {
          path:'',
          component: ConfigurationsComponent,
          },
          {
            path: 'addConfiguration',
            component: AddConfigurationComponent,
          }    
        ]
      },

    ]
  },

  // ROutes for the user section
  {
    path:'user/:identifier',
    component: UserComponent,
    children:[
      {
        path:'',
        component: ViewTransactionComponent 
      },
      { path: 'user-trans', 
       component: TransactionPageComponent 
     },
    //   {
    //    path:'',
    //     component: UserComponent,
    //   },
    //   { path: 'user-trans', 
    //   component: TransactionPageComponent 
    // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
