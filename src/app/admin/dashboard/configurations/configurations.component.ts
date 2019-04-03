import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Configuration } from '../../../model/configuration'
import {OmnipaidServiceService} from '../../../omnipaid-service.service'

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  configurationData:any;
  displayedColumns: string[] = ['sending_fee','paypal_fee','currency_converter_key','paypal_authentication','paypal_secret_key'];
  dataSource: MatTableDataSource<any>;

  constructor(private _service:OmnipaidServiceService) { 
    this._service.getConfiguration().subscribe((data) =>{
      this.configurationData=data;
      console.log("data is", this.configurationData);
    })
  }

  ngOnInit() {
    this.setTransaction();
  }

  setTransaction(){
   this.dataSource = new MatTableDataSource(this.configurationData);
  }

}
