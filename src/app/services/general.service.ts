import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GeneralService { 

  constructor(private http: HttpClient) { 
  } 

  getPosts(toExclude) { 
    const data = JSON.stringify(toExclude);
    return this.http.post('/api/posts/', data, httpOptions);
  }

}
