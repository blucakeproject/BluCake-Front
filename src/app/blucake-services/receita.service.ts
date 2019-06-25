import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../blucake-models/responseDTO';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO } from '../blucake-models/usuarioDTO';
import { ReceitaDTO } from '../blucake-models/receitaDTO';

@Injectable()
export class ReceitaService {

    constructor(private http: HttpClient) { }

    buscarReceitas(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(`${API_CONFIG.baseUrl}/receitas`);
    }

    addReceita(receita: ReceitaDTO): Observable<ResponseDTO> {
        return this.http.post<ResponseDTO>(`${API_CONFIG.baseUrl}/receitas`, receita);
    }

    atualizarReceita(receita: ReceitaDTO): Observable<ResponseDTO> {
        return this.http.put<ResponseDTO>(`${API_CONFIG.baseUrl}/receitas`, receita);
    }

}
