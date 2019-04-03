import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { Mobilemoney } from './model/mobilemoney'
import { Configuration } from './model/configuration'

@Injectable({
  providedIn: 'root'
})
export class OmnipaidServiceService {
  apiUrl: string = "http://localhost:8081/api/v1/omnipaid/";
  constructor(private http: HttpClient) { }

  getCurrencies(currency: string): Observable<any> {
    return this.http.get(this.apiUrl + 'currencyConverter/' + currency);
  }

  
  computeTransaction(identifier: String, number: String, receiver: any) {
    return this.http.post(this.apiUrl + "payer/" + identifier + "/transaction/" + number, receiver)
  }

  getCharges(currency_code: String, amount: AnalyserNode) {
    return this.http.get(this.apiUrl + 'fee/currency/' + currency_code + '/amount/' + amount)
  }

  login(identifier:string, password:string){
    let token = btoa(identifier + ":" + password)
    let  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Basic' +token);
    return this.http.get(this.apiUrl + `sender/${identifier}`, {headers: headers}
    )
  }


  // login(loginPayload) {

  //   let headers = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('Authorization', 'Basic ' + btoa('devglan-client:devglan-secret'));

  //   const httpParams = new HttpParams()
  //     .set('username', loginPayload.identifier)
  //     .set('password', loginPayload.password)
  //     .set('grant_type', 'password');
  //   return this.http.post(this.apiUrl + `oauth/token`, "", { params: httpParams, headers: headers });
  // }


  createUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl + 'sender', user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    });
  }
  getUser(identifier: string) {
    return this.http.get(this.apiUrl + 'sender/' + identifier, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json'
    })
  }

  createMomo(mobilemoney: Mobilemoney): Observable<any> {
    return this.http.post(this.apiUrl + 'mobile_money', mobilemoney, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    });
  }

  getMomo() {
    return this.http.get(this.apiUrl + 'mobile_money', {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json'
    })
  }

  deleteMomo(id: number) {
    return this.http.delete(this.apiUrl + 'mobile_money/' + id, {
      headers: new HttpHeaders(),
      responseType: 'text'
    })
  }
  updateMomo(id: number): Observable<any> {
    return this.http.put(this.apiUrl + 'mobile_money', id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    })
  }

  //Get all transactions
  getTransaction() {
    return this.http.get(this.apiUrl + 'transactions', {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json'
    })
  }

  //Get transactions for a particular user
  getUserTransaction(identifier:string): Observable<any>{
    return this.http.get(this.apiUrl+ `/transactions/${identifier}`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json'
    })
  }

  //Get configurations
  getConfiguration() {
    return this.http.get(this.apiUrl + 'configuration', {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json'
    })
  }

  createConfiguration(configuration: Configuration) {
    return this.http.post(this.apiUrl + 'configuration', configuration, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text'
    })
  }

}
