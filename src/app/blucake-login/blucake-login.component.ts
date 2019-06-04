import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../blucake-services/login.service';
import { UsuarioDTO } from '../blucake-models/usuarioDTO';
import { EnviarEmailService } from '../blucake-services/enviar-email';

@Component({
  selector: 'app-blucake-login',
  templateUrl: './blucake-login.component.html',
  styleUrls: ['./blucake-login.component.css']
})
export class BlucakeLoginComponent implements OnInit {

  @Input() logarDeslogar: boolean;

  formulario: FormGroup;
  formularioRegistro: FormGroup;

  creds: UsuarioDTO = {
    id: '',
    nome: '',
    email: '',
    perfil: '',
    senha: '',
    dsPerfil: '',
    nomeContato: '',
    telefone1: '',
    telefone2: '',
    telefoneFixo: '',
    rg: '',
    cpf: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    dataContrato: ''
  };

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginServie: LoginService,
    private enviarEmailService: EnviarEmailService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      email: [null],
      senha: [null]
    });

    this.formularioRegistro = this.formBuilder.group({
      remetNome: [null],
      remetEmail: [null]
    });

  }

  onSubmit() {
    this.creds.email = this.formulario.value.email;
    this.creds.senha = this.formulario.value.senha;

    this.loginServie.authenticate(this.creds).subscribe(response => {
      const aux = JSON.parse(response.body);
      this.loginServie.successfulLogin(aux);
    }, error => {
      this.loginServie.noSuccessfulLogin();
      this.showError();
      console.log(error);
    });
    console.log(this.logarDeslogar);
  }

  onSubmitRegistro() {
    const userEmail = {
      remetNome: this.formularioRegistro.value.remetNome,
      remetEmail: this.formularioRegistro.value.remetEmail,
      tipoEnvio: 1
    };

    this.enviarEmailService.EnviarEmail(userEmail).subscribe(ret => {
      if (ret.data) {
        alert('Email enviado com sucesso');
      }
    });
  }

  showError() {
    alert('sdfvjsdgfjgsdhfhds');
  }

  deslogar() {
    this.loginServie.noSuccessfulLogin();
    this.router.navigate(['/home']);
  }
}
