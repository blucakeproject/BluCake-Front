import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../blucake-models/responseDTO';
import { API_CONFIG } from '../config/api.config';
import { UsuarioDTO } from '../blucake-models/usuarioDTO';


@Injectable()
export class EnviarEmailService {


    constructor(private http: HttpClient) { }


    EnviarEmail(user: any): Observable<ResponseDTO> {
        return this.http.post<ResponseDTO>(`${API_CONFIG.baseUrl}/enviaEmail`, user);
    }
}
