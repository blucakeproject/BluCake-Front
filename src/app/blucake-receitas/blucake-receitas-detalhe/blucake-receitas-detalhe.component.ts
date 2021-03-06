import { StorageService } from './../../blucake-services/storage.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BluCakeService } from 'src/app/blucake-services/blucake.service';
import { ReceitaDTO } from 'src/app/blucake-models/receitaDTO';
import { IngredienteDTO } from 'src/app/blucake-models/ingredienteDTO';
import { IngredienteService } from 'src/app/blucake-services/ingredientes.service';
import { Router } from '@angular/router';
import { ReceitaService } from 'src/app/blucake-services/receita.service';

import { UploadFileService } from './../../blucake-services/uploadFileService ';


@Component({
  selector: 'app-blucake-receitas-detalhe',
  templateUrl: './blucake-receitas-detalhe.component.html',
  styleUrls: ['./blucake-receitas-detalhe.component.css']
})
export class BlucakeReceitasDetalheComponent implements OnInit {


  formularioReceita: FormGroup;

  receitaSelecionada: ReceitaDTO;
  listaIngedientesReceita: IngredienteDTO[] = [];
  listaClassificacaoReceita: any[] = [];
  imagem: String;

  selectedFiles: FileList;

  todosIngreditentes: IngredienteDTO[] = [];

  public loading = false;

  constructor(private formBuilder: FormBuilder,
    private bluCakeService: BluCakeService,
    private ingredienteService: IngredienteService,
    private router: Router,
    private storageService: StorageService,
    private receitaService: ReceitaService,
    private uploadFileService: UploadFileService) { }

  ngOnInit() {
    this.criarForm();
    this.receitaSelecionada = this.bluCakeService.getValue();
    this.carregarFormReceita();
    this.ativarTodosIngredientesModal();

  }

  ativarTodosIngredientesModal() {
    this.ingredienteService.buscarTodosIngredientes().subscribe(ret => {
      this.todosIngreditentes = ret.data;
    });
  }

  criarForm() {
    this.formularioReceita = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.compose([Validators.required])],
      preco: [null, Validators.compose([Validators.required])],
      ativo: [null],
      descricao: [null]
    });
  }

  carregarFormReceita() {
    if (this.receitaSelecionada) {
      this.formularioReceita.controls.id.setValue(this.receitaSelecionada.id);
      this.formularioReceita.controls.nome.setValue(this.receitaSelecionada.nome);
      this.formularioReceita.controls.preco.setValue(this.receitaSelecionada.preco);
      this.formularioReceita.controls.ativo.setValue(this.receitaSelecionada.ativo || 'S');
      this.formularioReceita.controls.descricao.setValue(this.receitaSelecionada.descricao);

      // Lista ingredientes
      this.listaIngedientesReceita = this.receitaSelecionada.ingredienteReceitas || [];

      // Lista Classificacao
      this.listaClassificacaoReceita = [];

      // Imagem
      this.imagem = this.receitaSelecionada.imagem;
    }
  }

  showMessage(event) {
    console.log(event);

  }

  selecionarClassificacao(sec, value) {
    if (value.currentTarget.checked) {
      this.listaClassificacaoReceita.push(sec);
    } else {
      this.listaClassificacaoReceita = this.listaClassificacaoReceita.filter(ing => ing.id !== sec.id);
    }
  }

  cancelarCadastro() {
    this.bluCakeService.setValue(null);
    this.router.navigate(['/receitas']);
  }

  salvarCadastroReceita() {
    if (this.receitaSelecionada) {
      this.salvarNovaReceita(this.receitaSelecionada.id);
    } else {
      this.salvarNovaReceita(null);
    }
  }

  salvarNovaReceita(id) {
    var dataCadastro;
    if (this.receitaSelecionada) {
      dataCadastro = this.receitaSelecionada.dataCadastro
    }else{
      dataCadastro = null
    }
    const receitaDTO: ReceitaDTO = {
      id: id,
      nome: this.formularioReceita.value.nome,
      descricao: this.formularioReceita.value.descricao,
      preco: this.formularioReceita.value.preco,
      imagem: this.imagem,

      dataCadastro: dataCadastro,
      ativo: this.formularioReceita.value.ativo,
      ingredienteReceitas: this.listaIngedientesReceita,
      usuario: this.storageService.getLocalUser().usuario,
      classificacao: this.listaClassificacaoReceita
    };
    this.receitaService.addReceita(receitaDTO).subscribe(ret => {
      this.cancelarCadastro();
    });
  }

  upload() {
    this.loading = true;
    const file = this.selectedFiles.item(0);
    this.uploadFileService.uploadfile(file).then(ret => {
      this.imagem = ret;
      this.loading = false;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }
}
