import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BluCakeService } from 'src/app/blucake-services/blucake.service';
import { ReceitaDTO } from 'src/app/blucake-models/receitaDTO';
import { IngredienteDTO } from 'src/app/blucake-models/ingredienteDTO';

@Component({
  selector: 'app-blucake-receitas-detalhe',
  templateUrl: './blucake-receitas-detalhe.component.html',
  styleUrls: ['./blucake-receitas-detalhe.component.css']
})
export class BlucakeReceitasDetalheComponent implements OnInit {


  formularioReceita: FormGroup;

  receitaSelecionada: ReceitaDTO;
  listaIngedientesReceita: IngredienteDTO[];
  listaClassificacaoReceita: any[];
  imagem: String;

  constructor(private formBuilder: FormBuilder,
    private bluCakeService: BluCakeService) { }

  ngOnInit() {
    this.criarForm();
    this.receitaSelecionada = this.bluCakeService.getValue();
    this.carregarFormReceita();
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
      this.listaIngedientesReceita = this.receitaSelecionada.ingredienteReceitas;

      // Lista Classificacao
      this.listaClassificacaoReceita = [];

      // Imagem
      this.imagem = this.receitaSelecionada.imagem;
    }
  }
}
