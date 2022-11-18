import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  Basepath() {
    // return `http://192.168.70.9:5000/api/`;
    return `https://pokeapi.co/api/v2/`;
  }

  Headers() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, X-Auth-Token, content-type',
      'Access-Control-Allow-Credentials': 'true',
    });
  }
}
