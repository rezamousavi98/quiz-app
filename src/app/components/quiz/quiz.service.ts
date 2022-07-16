import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  apiUrl = `https://62d06c4ad9bf9f1705895479.mockapi.io/api/`;
  constructor(private http: HttpClient) { }

  get<ResultType>(options: {route: string, category?: string}): Observable<ResultType[]> {
    const url = options.category ? `${this.apiUrl}/${options.route}/?category=${options?.category}` : `${this.apiUrl}/${options.route}/`;
    return this.http.get<ResultType[]>(url, httpOptions);
  }

  getById<ResultType>(options: {route: string, id: string}): Observable<ResultType> {
    const url = `${this.apiUrl}/${options.route}/${options.id}`
    return this.http.get<ResultType>(url, httpOptions);
  }

  post<ResultType>(options: {route: string, body: ResultType}): Observable<ResultType> {
    const url = `${this.apiUrl}/${options.route}/`
    return this.http.post<ResultType>(url, options.body, httpOptions);
  }

  patch<ResultType>(options: {route: string, id: string, body: ResultType}): Observable<ResultType> {
    const url = `${this.apiUrl}/${options.route}/${options.id}`;
    return this.http.patch<ResultType>(url, options.body, httpOptions);
  }

  delete<ResultType>(options: {route: string, id: string}): Observable<ResultType> {
    const url = `${this.apiUrl}/${options.route}/${options.id}`;
    return this.http.delete<ResultType>(url, httpOptions);
  }
}
