import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { IngredienteService } from '../blucake-services/ingredientes.service';
import { Router } from '@angular/router';
import { BluCakeService } from '../blucake-services/blucake.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngredienteDTO } from '../blucake-models/ingredienteDTO';
import { StorageService } from '../blucake-services/storage.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-blucake-ingredientes',
  templateUrl: './blucake-ingredientes.component.html',
  styleUrls: ['./blucake-ingredientes.component.css']
})
export class BlucakeIngredientesComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  formularioIngrediente: FormGroup;

  records;

  mensagem;

  constructor(private ingredienteService: IngredienteService,
    private router: Router,
    private bluCakeService: BluCakeService,
    private formBuilder: FormBuilder,
    private storageService: StorageService) { }

  ngOnInit() {
    this.ativarIngredientes(true);
    this.criarForm();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };
  }

  criarForm() {
    this.formularioIngrediente = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.compose([Validators.required])],
      usuarioId: [null]
    });

  }

  ativarIngredientes(render: Boolean) {
    this.ingredienteService.buscarTodosIngredientes().subscribe(ret => {
      this.records = ret.data;
      if (render) {
        this.dtTrigger.next();
      } else {
        this.rerender();
      }
    });
  }

  salvar() {
    const ingredienteDTO: IngredienteDTO = {
      id: this.formularioIngrediente.value.id || null,
      nome: this.formularioIngrediente.value.nome,
      usuarioId: this.storageService.getLocalUser().usuario.id,
      dataCadastro: null
    };
    this.mensagem = "Informe um ingrediente!"
    this.ingredienteService.addIngrediente(ingredienteDTO).subscribe(ret => {
      this.criarForm();
      this.ativarIngredientes(false);

      switch (ret.data) {
        case true:
          this.mensagem = "Ingrediente adicionado com sucesso!"
          break;
        case false:
          this.mensagem = "Este Ingrediente ja existe!"
          break;
      }
    });

  }

  removerIngredientes(rec) {
    const ingredienteDTO: IngredienteDTO = {
      id: rec.id,
      nome: rec.nome,
      usuarioId: rec.usuario.id,
      dataCadastro: null
    };
    this.mensagem = "Não foi possível Remover! Receitas possuem este Ingrediente."
    this.ingredienteService.deletarIngrediente(ingredienteDTO).subscribe(ret => {
      this.ativarIngredientes(false);

      switch (ret.data) {
        case true:
          this.mensagem = "Ingrediente removido com sucesso!"
          break;
        case false:
          this.mensagem = "Não foi possível Remover! Receitas possuem este Ingrediente."
          break;
      }
    });

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
