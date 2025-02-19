import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'https://ondc.mesugatra.com/assettracker/api/v1/c/u/locations';
  constructor(private http: HttpClient) {}
  
  getLocations(): Observable<Location[]> {
    
    const headers = new HttpHeaders({
      'Authorization': 'BearerEAAPEzKVL9z0BO2jukAlcB1c0ZBZBbAsNw3ZB8mCkr5UGy8PNhvoItlXLcE7Qb5MWsZCgysf3gMtPzqhkXdRoShZAIR0VRCZAKh0vBqzwDiwk9KmjO69PQkc4xggbhmQOONnuVHRSSE7I42wFvbbuv4qsbnoyvbLrZCP8qvNcGyHcbVezJcrJj9uGIOlmFbZBTNoLaIXjjTC2nBMU7GAAMbJ5i77hw69BqlbEcZBE4uN59XKpB9k4UoKMZD '
    });
  
    return this.http.get<Location[]>(this.apiUrl, { headers });
    }
}
