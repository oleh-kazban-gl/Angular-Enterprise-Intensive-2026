import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Location } from './location-search.service.models';

@Injectable({ providedIn: 'root' })
export class LocationSearchService {
  private readonly http = inject(HttpClient);

  search(query: string): Observable<Location[]> {
    return this.http.get<Location[]>('/locations', { params: { name_contains: query } });
  }
}
