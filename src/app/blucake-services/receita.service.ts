import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../blucake-models/responseDTO';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO } from '../blucake-models/usuarioDTO';
import { ReceitaDTO } from '../blucake-models/receitaDTO';
import { StorageService } from './../blucake-services/storage.service';

@Injectable()
export class ReceitaService {

    constructor(private http: HttpClient,
        private storageService: StorageService,) { }

    buscarReceitas(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(`${API_CONFIG.baseUrl}/receitas`);
    }

    buscarReceitasUsuario(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(`${API_CONFIG.baseUrl}/receitas/${this.storageService.getLocalUser().usuario.id}`);
    }

    addReceita(receita: ReceitaDTO): Observable<ResponseDTO> {
        return this.http.post<ResponseDTO>(`${API_CONFIG.baseUrl}/receitas`, receita);
    }

    atualizarReceita(receita: ReceitaDTO): Observable<ResponseDTO> {
        return this.http.post<ResponseDTO>(`${API_CONFIG.baseUrl}/receitas`, receita);
    }

}
