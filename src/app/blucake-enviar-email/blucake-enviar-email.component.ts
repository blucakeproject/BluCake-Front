import { EnviarEmailDTO } from './../blucake-models/enviarEmailDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EnviarEmailService } from '../blucake-services/enviar-email';
import { MessageService } from '../blucake-services/MessageService';
import { BluCakeService } from '../blucake-services/blucake.service';

@Component({
  selector: 'app-blucake-enviar-email',
  templateUrl: './blucake-enviar-email.component.html',
  styleUrls: ['./blucake-enviar-email.component.css']
})
export class BlucakeEnviarEmailComponent implements OnInit {

  formulario: FormGroup;

  receitaSelecionada;
  nomeConfeiteiro;

  constructor(private formBuilder: FormBuilder,
    private enviarEmailService: EnviarEmailService,
    private bluCakeService: BluCakeService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessage().subscribe(ret => {
      this.receitaSelecionada = ret;
      this.nomeConfeiteiro = ret.usuario.nome;
    });

    this.formulario = this.formBuilder.group({
      email: [null],
      telefone: [null],
      textArea: [null],
      nome: [null]
    });
  }

  onSubmitEnviarEmailInter() {
    const enviarEmailDTO = {
      destEmail: this.receitaSelecionada.usuario.email,
      destNome:  this.receitaSelecionada.usuario.nome,
      idUsuario: this.receitaSelecionada.usuario.id,
      remetEmail: this.formulario.value.email,
      remetNome: this.formulario.value.nome,
      tipoEnvio: 2,
      idReceita: this.receitaSelecionada.id,
      nomeReceita: this.receitaSelecionada.nome,
      telefone: this.formulario.value.telefone,
      assunto: '',
      mensagem: this.formulario.value.textArea
    };

    this.enviarEmailService.EnviarEmail(enviarEmailDTO).subscribe(ret => {
      debugger
      if (ret.data) {
        alert('Email enviado com sucesso');
      }
    });
  }
}
