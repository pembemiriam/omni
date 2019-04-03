import { Component, OnInit,ViewChild } from '@angular/core';
import {Transaction} from '../../../model/transaction'
import {OmnipaidServiceService} from '../../../omnipaid-service.service'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactionData:any
  displayedColumns: string[] = ['transaction_id','transaction_status','momo_fee','sending_fee','receiver.id','user.identifier'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _service:OmnipaidServiceService) {
    this._service.getTransaction().subscribe((data) =>{
      this.transactionData=data;
      console.log("data is", this.transactionData);
    })
   }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {
    this.setTransaction();
  }

  setTransaction(){
   this.dataSource = new MatTableDataSource(this.transactionData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
