import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  url: string = "http://localhost:3000/posts/";

  constructor(private http: HttpClient) { }

  addUSer(data: any) {
    return this.http.post(this.url, data);
  }

  getAllRecord() {
    return this.http.get(this.url);
  }

  deleteRecord(id: number) {

    return this.http.delete(this.url + id);
  }

  editRecord(id: number, data: any) {
    debugger
    return this.http.put(this.url+id, data)
  }
}
