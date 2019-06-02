import { IngredienteDTO } from './../../blucake-models/ingredienteDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BluCakeService } from 'src/app/blucake-services/blucake.service';
import { IngredienteService } from 'src/app/blucake-services/ingredientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingrediente-detalhe',
  templateUrl: './ingrediente-detalhe.component.html',
  styleUrls: ['./ingrediente-detalhe.component.css']
})
export class IngredienteDetalheComponent implements OnInit {

  formularioIngrediente: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private bluCakeService: BluCakeService,
    private ingredienteService: IngredienteService,
    private router: Router) { }

  ngOnInit() {

    if (this.bluCakeService.getValue()) {
      this.formularioIngrediente = this.formBuilder.group({
        id: [this.bluCakeService.getValue().id],
        nome: [this.bluCakeService.getValue().nome]
      });
    } else {
      this.formularioIngrediente = this.formBuilder.group({
        id: [null],
        nome: [null]
      });
    }
  }

  salvar() {
    const ingredienteDTO: IngredienteDTO = {
      id: this.formularioIngrediente.value.id,
      nome: this.formularioIngrediente.value.nome
    };

    this.ingredienteService.addIngrediente(ingredienteDTO).subscribe(ret => {
      this.router.navigate(['/ingredientes']);
    });
  }


}


