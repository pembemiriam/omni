import { Component, OnInit } from '@angular/core';
import { OmnipaidServiceService } from '../omnipaid-service.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatDialogRef } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false
  user:any
  constructor(private formBuilder: FormBuilder, private _router: Router, private _service: OmnipaidServiceService, public dialogRef: MatDialogRef<LoginDialogComponent>) { }


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
  
  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      identifier: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }



  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
       this._service.login(this.loginForm.get('identifier').value,this.loginForm.get('password').value )
       .subscribe((data) =>{
         this.user = data;
         console.log("user info is ", this.user);
         
         this.dialogRef.close();
         this._router.navigate(['user',this.user.identifier]);  
    }, (error) => {
      this.showNotification('top', 'left', "Could not login")
      // alert(error.error.error_description)
    });
  }

}