import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../blucake-models/responseDTO';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO } from '../blucake-models/usuarioDTO';
import { IngredienteDTO } from '../blucake-models/ingredienteDTO';


@Injectable()
export class IngredienteService {

    constructor(private http: HttpClient) { }

    buscarTodosIngredientes(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(
            `${API_CONFIG.baseUrl}/ingrediente`);
    }

    addIngrediente(ingrediente: IngredienteDTO): Observable<ResponseDTO> {
        return this.http.post<ResponseDTO>(`${API_CONFIG.baseUrl}/ingrediente`, ingrediente);
    }

    atualizarIngrediente(ingrediente: IngredienteDTO): Observable<ResponseDTO> {
        return this.http.put<ResponseDTO>(`${API_CONFIG.baseUrl}/ingrediente`, ingrediente);
    }

    deletarIngrediente(ingrediente: IngredienteDTO): Observable<ResponseDTO> {
        return this.http.delete<ResponseDTO>(`${API_CONFIG.baseUrl}/ingrediente/${ingrediente.id}`);
    }
}
