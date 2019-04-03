import { Component, OnInit} from '@angular/core';
import { OmnipaidServiceService} from '../omnipaid-service.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any
  constructor(private _service:OmnipaidServiceService, private route:ActivatedRoute){

  }

  ngOnInit(){
    this.getUser();
  }

  getUser():void{
    const identifier = this.route.snapshot.paramMap.get('identifier');
    console.log(identifier);
    this._service.getUser(identifier).subscribe(data =>{
      this.user = data;
    })
  }

  // getTransaction():void{
  //   const identifier = this.route.snapshot.paramMap.get('identifier');

  // }

}
