import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimpleHttpService {
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, this.httpOptions);
  }

  post<T>(url: string, data: any = {}): Observable<T> {
    return this.http.post<T>(url, data, this.httpOptions);
  }

  put<T>(url: string, data: any = {}): Observable<T> {
    return this.http.put<T>(url, data, this.httpOptions);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, this.httpOptions);
  }
}
