import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../blucake-models/usuarioDTO';
import { API_CONFIG } from '../config/api.config';
import { LocalUser } from '../blucake-models/localUser';
import { StorageService } from './storage.service';


@Injectable()
export class LoginService {

  usuarioLogado: EventEmitter<Boolean> = new EventEmitter();


  constructor(private http: HttpClient,
    private storageService: StorageService) { }

  authenticate(creds: UsuarioDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
        creds, {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  successfulLogin(ret) {
    const user: LocalUser = {
      token: ret.data.token,
      email: '',
      usuario: ret.usuario
    };
    this.storageService.setLocalUser(user);
    this.usuarioLogado.emit(true);
  }

  noSuccessfulLogin() {
    const user: LocalUser = {
      token: '',
      email: '',
      usuario: ''
    };
    this.storageService.setLocalUser(null);
    this.usuarioLogado.emit(false);
  }
}
