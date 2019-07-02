import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../blucake-services/home.service';
import { BluCakeService } from '../blucake-services/blucake.service';
import { MessageService } from '../blucake-services/MessageService';

@Component({
  selector: 'app-blucake-home',
  templateUrl: './blucake-home.component.html',
  styleUrls: ['./blucake-home.component.css']
})
export class BlucakeHomeComponent implements OnInit {

  records;

  stringFiltro;

  constructor(private homeService: HomeService,
              private bluCakeService: BluCakeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.ativarTabela();
  }

  ativarTabela() {
    this.homeService.buscarTodosHome().subscribe(res => {
      this.records = res.data;
      if (this.stringFiltro) {
        this.records = this.records.filter(items => items.nome.includes(this.stringFiltro));
      }
    });
  }

  boloSelecionado(rec) {
    this.messageService.sendMessage(rec);
    this.bluCakeService.setValue(rec);
  }

  filtroDigital(str: String) {
    this.stringFiltro = str;
       this.ativarTabela();
  }

  filtrarMenorPreco() {
    this.homeService.buscarMenorPreco().subscribe(res => {
      this.records = res.data;
      if(this.stringFiltro){
        this.records = this.records.filter(items => items.nome.includes(this.stringFiltro));
      }
    });
  }

  filtrarMaiorPreco(){
    this.homeService.buscarMaiorPreco().subscribe(res => {
      this.records = res.data;
      if(this.stringFiltro){
        this.records = this.records.filter(items => items.nome.includes(this.stringFiltro));
      }
    });
  }

}
