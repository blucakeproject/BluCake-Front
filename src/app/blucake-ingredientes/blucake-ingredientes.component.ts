import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../blucake-services/ingredientes.service';
import { Router } from '@angular/router';
import { BluCakeService } from '../blucake-services/blucake.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IngredienteDTO } from '../blucake-models/ingredienteDTO';
import { StorageService } from '../blucake-services/storage.service';



@Component({
  selector: 'app-blucake-ingredientes',
  templateUrl: './blucake-ingredientes.component.html',
  styleUrls: ['./blucake-ingredientes.component.css']
})
export class BlucakeIngredientesComponent implements OnInit {

  formularioIngrediente: FormGroup;

  records;

  public paginaAtual = 1;


  constructor(private ingredienteService: IngredienteService,
    private router: Router,
    private bluCakeService: BluCakeService,
    private formBuilder: FormBuilder,
    private storageService: StorageService) { }

  ngOnInit() {
    this.ativarIngredientes();
    this.formularioIngrediente = this.formBuilder.group({
      id: [null],
      nome: [null],
      usuarioId: [null]
    });
  }

  ativarIngredientes() {
    this.ingredienteService.buscarTodosIngredientes().subscribe(ret => {
      this.records = ret.data;
    });
  }

  salvar() {
    const ingredienteDTO: IngredienteDTO = {
      id: this.formularioIngrediente.value.id || null,
      nome: this.formularioIngrediente.value.nome,
      usuarioId: this.storageService.getLocalUser().usuario.id,
      dataCadastro: null
    };
    this.ingredienteService.addIngrediente(ingredienteDTO).subscribe(ret => {
     this.ativarIngredientes();
    });
  }

  removerIngredientes(rec) {
    const ingredienteDTO: IngredienteDTO = {
      id: rec.id,
      nome: rec.nome,
      usuarioId: rec.usuario.id,
      dataCadastro: null
    };
    this.ingredienteService.deletarIngrediente(ingredienteDTO).subscribe(ret => {
      debugger
    });
  }

  configDataTable() {
    // $(document).ready(function () {
    //     $('#table-lista-ingredientes').DataTable({
    //       language: {
    //         'sEmptyTable': 'Nenhum registro encontrado',
    //         'sInfo': 'Mostrando de _START_ até _END_ de _TOTAL_ registros', 'sInfoEmpty': 'Mostrando 0 até 0 de 0 registros',
    //         'sInfoFiltered': '(Filtrados de _MAX_ registros)', 'sInfoPostFix': '',
    //         'sInfoThousands': '.', 'sLengthMenu': '_MENU_ resultados por página',
    //         'sLoadingRecords': 'Carregando...', 'sProcessing': 'Processando...',
    //         'sZeroRecords': 'Nenhum registro encontrado', 'sSearch': 'Pesquisar',
    //         'oPaginate': {
    //           'sNext': 'Próximo', 'sPrevious': 'Anterior',
    //           'sFirst': 'Primeiro', 'sLast': 'Último'
    //         },
    //         'oAria': {
    //           'sSortAscending': ': Ordenar colunas de forma ascendente',
    //           'sSortDescending': ': Ordenar colunas de forma descendente'
    //         }
    //       }
    //     });
    //   });
  }
}
