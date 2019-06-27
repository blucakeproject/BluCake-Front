import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../blucake-models/responseDTO';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class HomeService {


    constructor(private http: HttpClient) { }

    buscarTodosHome(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(
            `${API_CONFIG.baseUrl}/home`);
    }

    buscarMenorPreco(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(
            `${API_CONFIG.baseUrl}/home/menorPreco`);
    }

    buscarMaiorPreco(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(
            `${API_CONFIG.baseUrl}/home/maiorPreco`);
    }

}
