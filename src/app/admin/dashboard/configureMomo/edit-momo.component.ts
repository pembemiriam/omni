import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OmnipaidServiceService} from '../../../omnipaid-service.service'
import { Mobilemoney } from 'src/app/model/mobilemoney';


@Component({
    selector: 'edit-momo',
    templateUrl: 'edit-momo.component.html',
  })
  export class EditMobileMoneyDialogComponent implements OnInit {
    mobilemoney:any;

    constructor(
      public dialogRef: MatDialogRef<EditMobileMoneyDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
      private _service:OmnipaidServiceService) {
      }


  
    onNoClick(): void {
      this.dialogRef.close();
    }
    onSubmit(value){
      console.log("it is",value);
      this._service.updateMomo(value).subscribe((data) =>{
        this.mobilemoney = data;
        console.log("data is ",this.mobilemoney);
        this.dialogRef.close(); 
      })
      
    }
    ngOnInit(){
    this.mobilemoney = this.data.momo;
    console.log(this.mobilemoney.momo)
    }
  
  }