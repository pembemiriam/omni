import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddMobileMoneyDialogComponent} from './add-momo.component'
import {EditMobileMoneyDialogComponent} from './edit-momo.component'
import {DeleteMobileMoneyDialogComponent} from './delete-momo.component'
import {OmnipaidServiceService} from '../../../omnipaid-service.service'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Mobilemoney } from 'src/app/model/mobilemoney';

export interface DialogData {
    id: number;

  }
@Component({
  selector: 'configure-momo',
  templateUrl: './configureMomo.component.html',
  styleUrls: ['./configureMomo.component.css']
})
export class ConfigureMobileMoneyComponent implements OnInit {

  mobilemoneyData:any;
  displayedColumns: string[] = ['start', 'end', 'cost','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private _service:OmnipaidServiceService) {
    this._service.getMomo().subscribe((data) =>{
      this.mobilemoneyData=data;
     // console.log("data is", this.mobilemoneyData);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMobileMoneyDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEdit(momo:Mobilemoney): void {
    const dialogRef = this.dialog.open(EditMobileMoneyDialogComponent, {
      width: '350px',
      data:{momo:momo}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDelete(id): void {
    console.log("value is",id)
    const dialogRef = this.dialog.open(DeleteMobileMoneyDialogComponent, {
      width: '350px',
      data:{id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  

  ngOnInit() {
    this.setMobilemoney();
  }

  setMobilemoney(){
   this.dataSource = new MatTableDataSource(this.mobilemoneyData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
