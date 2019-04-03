import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OmnipaidServiceService} from '../../../omnipaid-service.service'
export interface DialogData{
  from:number;
  to:number;
  charge:number;
}

@Component({
    selector: 'add-momo',
    templateUrl: 'add-momo.component.html',
  })
  export class AddMobileMoneyDialogComponent {
  
  mobilemoney:any;
    constructor(
      public dialogRef: MatDialogRef<AddMobileMoneyDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
      private _service:OmnipaidServiceService) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSubmit(value){
      console.log("value is",value)
      this._service.createMomo(value).subscribe((data) =>{
        this.mobilemoney = data;
        console.log("data is ",this.mobilemoney);
        this.dialogRef.close();
        //this._router.navigate(['user-detail', value.identifier])
      },(error)=>{
        console.log(error);
      })
    }
  
  
  }