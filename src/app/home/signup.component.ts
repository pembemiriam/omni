import { Component, OnInit } from '@angular/core';
import { OmnipaidServiceService } from '../omnipaid-service.service'
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatDialogRef} from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupDialogComponent implements OnInit {

    user:any 
    constructor( private _router: Router, private _service:OmnipaidServiceService,public dialogRef: MatDialogRef<SignupDialogComponent>) { }

    showNotification(from, align, message) {
        //const type = ['', 'info', 'success', 'warning', 'danger'];
     
        const type = ['info', 'success', 'warning',];
     
        const color = Math.floor((Math.random() * 4) + 1);
     
        $.notify({
          icon: "notifications",
          message: message
     
        }, {
            type: type[color],
            timer: 4000,
            placement: {
              from: from,
              align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
              '<i class="material-icons" data-notify="icon">notifications</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
              '</div>'
          });
      }

    onSubmit(value){
        this._service.createUser(value).subscribe((data) =>{
          this.user = data;
          //console.log("User created is ",this.user);
          this.dialogRef.close();
          this._router.navigate(['home'])
          this.showNotification('top','left',"Your account has been created successfully");
        },(error)=>{
            this.showNotification('top','lefft',"Error occured while creating your account")
          console.log(error);
        })
      }
    ngOnInit(){}
}
