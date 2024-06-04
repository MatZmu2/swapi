import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl = 'https://www.swapi.tech/api';

  constructor(private http: HttpClient) {}

  getRandomPerson(): Observable<any> {
    const id = Math.floor(Math.random() * 83) + 1; // SWAPI has 83 people
    return this.http.get(`${this.baseUrl}/people/${id}`);
  }

  getRandomStarship(): Observable<any> {
    const id = Math.floor(Math.random() * 36) + 1; // SWAPI has 36 starships
    return this.http.get(`${this.baseUrl}/starships/${id}`);
  }
}
