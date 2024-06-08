import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponse } from '../models/api-response.interface';
import { Person, Starship } from '../models/resource.model';
import { BASE_URL } from '../configs/base-url.injection-token';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: HttpClient,
  ) {}

  public getPeople(page = 1): Observable<ApiResponse<Person>> {
    return this.http.get<ApiResponse<Person>>(
      `${this.baseUrl}/people/?page=${page}`,
    );
  }

  public getStarships(page = 1): Observable<ApiResponse<Starship>> {
    return this.http.get<ApiResponse<Starship>>(
      `${this.baseUrl}/starships/?page=${page}`,
    );
  }
}