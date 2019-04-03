import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {OmnipaidServiceService} from '../../../omnipaid-service.service'
import {DialogData} from './configureMomo.component'


@Component({
    selector: 'delete-momo',
    templateUrl: 'delete-momo.component.html',
  })
  export class DeleteMobileMoneyDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<DeleteMobileMoneyDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
      private _service :OmnipaidServiceService) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    onDelete(id){
      console.log("id is",id)
     this._service.deleteMomo(id).subscribe(data =>{
       console.log("Successfully deleted")
       this.dialogRef.close();
     })
    }
  
  }