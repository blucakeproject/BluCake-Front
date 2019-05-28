import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../blucake-models/responseDTO';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO } from '../blucake-models/usuarioDTO';


@Injectable()
export class UsuarioService {


    constructor(private http: HttpClient) { }

    buscarTodosUsuarios(): Observable<ResponseDTO> {
        return this.http.get<ResponseDTO>(
            `${API_CONFIG.baseUrl}/usuarios`);
    }

    addUsuario(user: UsuarioDTO): Observable<ResponseDTO> {
        return this.http.post<ResponseDTO>(`${API_CONFIG.baseUrl}/usuarios`, user);
    }

    atualizarUsuario(user: UsuarioDTO): Observable<ResponseDTO> {
        return this.http.put<ResponseDTO>(`${API_CONFIG.baseUrl}/usuarios`, user);
    }

    deletarUsuario(user: UsuarioDTO): Observable<ResponseDTO> {
        return this.http.delete<ResponseDTO>(`${API_CONFIG.baseUrl}/usuarios`);
    }
}
