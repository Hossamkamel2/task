import { Injectable } from '@angular/core';
import { PaginatedResponse, Users } from '../models/users.models';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`; // API endpoint (assuming you define apiUrl in environment)

  constructor(private http: HttpClient) {}

  // GET: Fetch users with optional pagination and search query
  getUsers(
    pageNumber: number = 1,
    pageSize: number = 10,
    search: string = ''
  ): Observable<PaginatedResponse<Users>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<Users>>(this.apiUrl, { params });
  }

  // GET: Fetch a single user by ID
  getUser(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }

  // POST: Add a new user
  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  // PUT: Update an existing user
  updateUser(id: number, user: Users): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // DELETE: Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
