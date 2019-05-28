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

  successfulLogin(token: string) {
    const user: LocalUser = {
      token: token,
      email: ''
    };
    this.storageService.setLocalUser(user);
    this.usuarioLogado.emit(true);
  }

  noSuccessfulLogin() {
    const user: LocalUser = {
      token: '',
      email: ''
    };
    this.storageService.setLocalUser(null);
    this.usuarioLogado.emit(false);
  }
}
