import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BluCakeService } from 'src/app/blucake-services/blucake.service';
import { ReceitaDTO } from 'src/app/blucake-models/receitaDTO';
import { IngredienteDTO } from 'src/app/blucake-models/ingredienteDTO';
import { IngredienteService } from 'src/app/blucake-services/ingredientes.service';
import { Router } from '@angular/router';

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

  todosIngreditentes: IngredienteDTO[] = [];

  constructor(private formBuilder: FormBuilder,
    private bluCakeService: BluCakeService,
    private ingredienteService: IngredienteService,
    private router: Router) { }

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
      nome: [null],
      preco: [null],
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

  }

  salvarNovaReceita() {
      // const receitaDTO: ReceitaDTO = {
      //   receita_id: this.formularioReceita.value.receita_id,
      //   nome: this.formularioReceita.value.nome,
      //   descricao: this.formularioReceita.value.descricao,
      //   preco: this.formularioReceita.value.preco,
      //   imagem: this.formularioReceita.value.imagem,
      //   dataCadastro: this.formularioReceita.value.dataCadastro || null,
      //   ativo: this.formularioReceita.value.ativo,
      //   ingredientes: this.formularioReceita.value.ingredientes,
      //   usuarioId: this.storageService.getLocalUser().usuario.id
      // };
      // this.receitaService.addReceita(receitaDTO).subscribe(ret => {

      //   this.criarForm();
      //   this.ativarReceitas();
      // });
  }
}
