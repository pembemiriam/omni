import { Component, OnInit } from '@angular/core';
import { OmnipaidServiceService } from '../../omnipaid-service.service'

import { AfterViewChecked } from '@angular/core';

declare let paypal: any;
declare var $: any;

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit, AfterViewChecked {

  sending_fees: any = 0;
  mobile_momney_fee: any = 0;
  paypal_fee: any = 0;
  currency_code: String;
  show: Boolean;
  total_to_send: any = 0;
  total_to_receive: any = 0;
  amount: any;

  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;
  enableValue = false;
  receiver: any;
  formValue = false;
  confirmValue = true;

  constructor(private _service: OmnipaidServiceService) { }


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

  }

  valueChange(currency): void {
    this.show = true;
    this._service.getCharges(currency.value, this.amount).subscribe(
      (data: any) => {
        console.log(data);

        this.mobile_momney_fee = data.mobile_money_fee;
        this.sending_fees = data.sending_fee.toFixed(2);
        this.paypal_fee = data.paypal_fee
        this.total_to_send = data.total_money_to_send.toFixed(2);
        this.total_to_receive = data.total_money_to_receive.toFixed(2);

        this.currency_code = currency.value
        this.show = false;
      },
      (error) => {
        console.log(error)
      }
    )
  }


  enable() {
    this.enableValue = true;
  }

  onSubmit(value) {
    this.receiver = value;
    this.formValue = true;
    console.log(this.receiver);

    this.test();
    this.confirmValue = false;
  }

  paypalConfig1 = {
    env: 'sandbox',
    client: {
      sandbox: 'AWfF9UAQe9qs0bBZFPIgnBHT8oeNcuPhEBulIuqXG4OlTIxK-DXYTrSiaQUNlRD4OVq-HEHW-U5-vVM-',
      production: 'EAhH7fUv_LLNA2-vRTLHngjJn-HM1ZXq0NJNvaY2Tr81EMMxrqHZqye6kyNxhtwWd4ArZ6mXqCMmrYWX'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.total_to_send, currency: this.currency_code } }
          ]
        }
      });
    },
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'paypal',
      height: 35
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        console.log("payment", payment)
        console.log("data", data)
        this.showNotification('top', 'left', "The Paypal transaction have been compute successfully " + data.orderID);
        this._service.computeTransaction("ghislain0", data.paymentID, this.receiver).subscribe(
          (data: any) => {
            console.log(data);
            this.showNotification('top', 'left', "The Omnipaid transaction have been compute successfully " + data.transaction_id);
          },
          (error) => {
            console.log(error)
            this.showNotification('top', 'left', "Hello ,something went wrong during the omnipaid transaction ,Please contact the Admin ");
          }
        )
        console.log(payment)
      })
    }
  };


  paypalConfig = {
    createOrder: (data, actions) => {
      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '100'
          }
        }]
      });
    },
    onApprove: (data, actions) => {

      // Capture the funds from the transaction
      return actions.order.capture().then(function (details) {
        // Show a success message to your buyer
        this.showNotification('top', 'left', data.orderID)
        // Call your server to save the transaction
        // return fetch('/paypal-transaction-complete', {
        //   method: 'post',
        //   headers: {
        //     'content-type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     orderID: data.orderID
        //   })
        // });
      });
    },
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'paypal',
      height: 25
    },
    onCancel: function (data) {
      // Show a cancel page, or return to cart
      this.showNotification('top', 'left', data)
    },
    onError: function (err) {
      // Show an error page here, when an error occurs
      this.showNotification('top', 'left', err)
    }
  };


  // ngAfterViewChecked(): void {
  //   if (!this.addScript) {
  //     this.addPaypalScript().then(() => {
  //       paypal.Buttons
  //       //(//this.paypalConfig
  //         // {
  //         //   createOrder: function (data, actions) {
  //         //     // Set up the transaction
  //         //     return actions.order.create({
  //         //       purchase_units: [{
  //         //         amount: {
  //         //           value: '100'
  //         //         }
  //         //       }]
  //         //     });
  //         //   },
  //         //   onApprove: function (data, actions) {

  //         //     // Capture the funds from the transaction
  //         //     return actions.order.capture().then(function (details) {
  //         //       // Show a success message to your buyer
  //         //       alert('Transaction completed by ' + details.payer.name.given_name);
  //         //       alert('Transaction completed by ' + data.orderID);
  //         //       // Call your server to save the transaction
  //         //       // return fetch('/paypal-transaction-complete', {
  //         //       //   method: 'post',
  //         //       //   headers: {
  //         //       //     'content-type': 'application/json'
  //         //       //   },
  //         //       //   body: JSON.stringify({
  //         //       //     orderID: data.orderID
  //         //       //   })
  //         //       // });
  //         //     });
  //         //   },
  //         //   style: {
  //         //     layout: 'vertical',
  //         //     color: 'blue',
  //         //     shape: 'rect',
  //         //     label: 'paypal',
  //         //     height: 25
  //         //   },
  //         //   onCancel: function (data) {
  //         //     // Show a cancel page, or return to cart
  //         //     this.showNotification('top', 'left', data)
  //         //   },
  //         //   onError: function (err) {
  //         //     // Show an error page here, when an error occurs
  //         //     this.showNotification('top', 'left', err)
  //         //   }
  //         // }
  //      // )
  //       .render(this.paypalConfig1, '#paypal-checkout-btn');
  //       //render('#paypal-button-container');
  //       this.paypalLoad = false;
  //     })
  //   }
  // }

  ngAfterViewChecked(): void {
    // if (!this.addScript) {
    //   this.addPaypalScript().then(() => {
    //     paypal.Button.render(this.paypalConfig1, '#paypal-checkout-btn');
    //     this.paypalLoad = false;
    //   })
    // }
  }

  test(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig1, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      // scripttagElement.src = 'https://www.paypal.com/sdk/js?client-id=AWfF9UAQe9qs0bBZFPIgnBHT8oeNcuPhEBulIuqXG4OlTIxK-DXYTrSiaQUNlRD4OVq-HEHW-U5-vVM-';
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }


}
