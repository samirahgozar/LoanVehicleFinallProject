import {HttpClient,HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { AgGridParameter } from "../data/agGridPrameter";
import { MethodResult } from "../data/method-result";

@Injectable()
export class SmartTableService {
  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLoanList(fitlerData: AgGridParameter): Observable<MethodResult> {
    const headers = new HttpHeaders()
      .set("content-type", "application/json")
      .set("Authorization", localStorage.getItem("token"))

      .set("Access-Control-Allow-Origin", "*");

    return this.http
      .post(
        `${this.baseUrl}loan/GetAllLoanList`,
        JSON.stringify(fitlerData),
        { headers: headers }
      )
      .pipe(
        map((response: any) => response || {}),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }
}
