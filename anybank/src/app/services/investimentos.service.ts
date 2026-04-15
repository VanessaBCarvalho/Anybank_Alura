import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvestimentosService {

  constructor(private http: HttpClient) {}

 getBitcoin() {
  return this.http.get<any>(
    'https://economia.awesomeapi.com.br/json/last/BTC-BRL'
  );
}

getDolar() {
  return this.http.get<any>(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL'
  );
}
}
