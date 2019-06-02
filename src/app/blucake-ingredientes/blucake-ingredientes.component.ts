import { Component, OnInit } from '@angular/core';
import { IngredienteService } from '../blucake-services/ingredientes.service';
import { Router } from '@angular/router';
import { BluCakeService } from '../blucake-services/blucake.service';

@Component({
  selector: 'app-blucake-ingredientes',
  templateUrl: './blucake-ingredientes.component.html',
  styleUrls: ['./blucake-ingredientes.component.css']
})
export class BlucakeIngredientesComponent implements OnInit {

  records;

  private registroSelecionado;

  constructor(private ingredienteService: IngredienteService,
              private router: Router,
              private bluCakeService: BluCakeService) { }

  ngOnInit() {
    this.ingredienteService.buscarTodosIngredientes().subscribe(ret => {
      this.records = ret.data;
    });
  }

  linhaSelecionada(registro) {
    this.registroSelecionado = registro;
  }

  visualizarIngrediente(event, registroSelecionado) {
    this.bluCakeService.setValue(registroSelecionado);
    this.router.navigate(['/ingredientesDetalhe']);
  }

}
