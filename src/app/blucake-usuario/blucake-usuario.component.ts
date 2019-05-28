import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../blucake-services/usuario.service';


@Component({
  selector: 'app-blucake-usuario',
  templateUrl: './blucake-usuario.component.html',
  styleUrls: ['./blucake-usuario.component.css']
})
export class BlucakeUsuarioComponent implements OnInit {


  records;


  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.ativarTabela();
  }

  ativarTabela() {
    this.usuarioService.buscarTodosUsuarios().subscribe(res => {
      this.records = res.data;
    });
  }

  linhaSelecionada(xb) {
    console.log(xb);
  }

}
