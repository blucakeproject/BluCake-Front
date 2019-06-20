import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BluCakeService } from '../blucake-services/blucake.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReceitaService } from '../blucake-services/receita.service';
import { ReceitaDTO } from '../blucake-models/receitaDTO';
import { StorageService } from '../blucake-services/storage.service';

@Component({
  selector: 'app-blucake-receitas',
  templateUrl: './blucake-receitas.component.html',
  styleUrls: ['./blucake-receitas.component.css']
})
export class BlucakeReceitasComponent implements OnInit {

  formularioReceita: FormGroup;
  records;
  public paginaAtual = 1;

  constructor(private receitaService: ReceitaService,
    private router: Router,
    private bluCakeService: BluCakeService,
    private formBuilder: FormBuilder,
    private storageService: StorageService) { }

  ngOnInit() {
    this.ativarReceitas();
    this.criarForm();
  }

  criarForm() {
    this.formularioReceita = this.formBuilder.group({
      receita_id: [null],
      nome: [null],
      descricao: [null],
      preco: [null],
      imagem: [null],
      dataCadastro: [null],
      ativo: [null],
      ingredientes: [],
      usuarioId: [null]
    });
  }

  ativarReceitas() {
    this.receitaService.buscarReceitasUsuario().subscribe(ret => {
      this.records = ret.data;
    });
  }

  salvar() {
    const receitaDTO: ReceitaDTO = {
      receita_id: this.formularioReceita.value.id || null,
      nome: this.formularioReceita.value.nome,
      descricao: this.formularioReceita.value.descricao,
      preco: this.formularioReceita.value.preco,
      imagem: this.formularioReceita.value.imagem,
      dataCadastro: this.formularioReceita.value.dataCadastro || null,
      ativo: this.formularioReceita.value.ativo,
      ingredientes: this.formularioReceita.value.ingredientes,
      usuarioId: this.storageService.getLocalUser().usuario.id
    };
    this.receitaService.addReceita(receitaDTO).subscribe(ret => {

      this.criarForm();
      this.ativarReceitas();
    });
  }

  atualizarReceita(){
    const receitaDTO: ReceitaDTO = {
      receita_id: this.formularioReceita.value.id,
      nome: this.formularioReceita.value.nome,
      descricao: this.formularioReceita.value.descricao,
      preco: this.formularioReceita.value.preco,
      imagem: this.formularioReceita.value.imagem,
      dataCadastro: this.formularioReceita.value.dataCadastro,
      ativo: this.formularioReceita.value.ativo,
      ingredientes: this.formularioReceita.value.ingredientes,
      usuarioId: this.storageService.getLocalUser().usuario.id
    };
    this.receitaService.atualizarReceita(receitaDTO).subscribe(ret => {

      this.criarForm();
      this.ativarReceitas();
    });
  }

}
