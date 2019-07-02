import { BluCakeService } from 'src/app/blucake-services/blucake.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReceitaService } from '../blucake-services/receita.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blucake-receitas',
  templateUrl: './blucake-receitas.component.html',
  styleUrls: ['./blucake-receitas.component.css']
})
export class BlucakeReceitasComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<any> = new Subject();

  records;

  constructor(private receitaService: ReceitaService,
    private router: Router,
    private bluCakeService: BluCakeService) { }

  ngOnInit() {
    this.ativarReceitas(true);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };
  }

  ativarReceitas(render: Boolean) {
    this.receitaService.buscarReceitas().subscribe(ret => {
      this.records = ret.data;
      if (render) {
        this.dtTrigger.next();
      } else {
        this.rerender();
      }
    });
  }

  edtarReceita(registro) {
    this.bluCakeService.setValue(registro);
    this.router.navigate(['/receitasDetalhe']);
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

  novaReceita() {
    this.bluCakeService.setValue(null);
    this.router.navigate(['/receitasDetalhe']);
  }

}
