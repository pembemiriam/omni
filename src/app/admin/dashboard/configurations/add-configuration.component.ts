import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Configuration } from '../../../model/configuration'
import {OmnipaidServiceService} from '../../../omnipaid-service.service'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'add-configurations',
  templateUrl: './add-configuration.component.html',
  styleUrls: ['./add-configuration.component.css']
})
export class AddConfigurationComponent implements OnInit {

    configuration:any;
    constructor(private _service:OmnipaidServiceService,private _router:Router){}

    ngOnInit(){}

    onSubmit(value){
        this._service.createConfiguration(value).subscribe((data) =>{
          this.configuration = data;
          this._router.navigate(['/dashboard/configurations'])
        },(error)=>{
          console.log(error);
        })
    }
}