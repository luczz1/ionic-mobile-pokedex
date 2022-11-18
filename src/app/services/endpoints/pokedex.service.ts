import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public getAllPokemon(): Observable<any> {
    return this.http.get(`${this.Basepath()}pokemon?limit=151`, {
      headers: this.Headers(),
    });
  }

  public getPokemonDetails(id: number): Observable<any> {
    return this.http.get(`${this.Basepath()}pokemon/${id}`, {
      headers: this.Headers(),
    });
  }
}
