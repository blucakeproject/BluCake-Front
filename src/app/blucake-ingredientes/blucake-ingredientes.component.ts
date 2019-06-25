import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { IngredienteService } from '../blucake-services/ingredientes.service';
import { Router } from '@angular/router';
import { BluCakeService } from '../blucake-services/blucake.service';
import { FormGroup, FormBuilder } from '@angular/forms';
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
      nome: [null],
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
    this.ingredienteService.addIngrediente(ingredienteDTO).subscribe(ret => {
      this.criarForm();
      this.ativarIngredientes(false);
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
      this.ativarIngredientes(false);
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
