import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { BluCakeService } from 'src/app/blucake-services/blucake.service';
import { MessageService } from 'src/app/blucake-services/MessageService';

@Component({
  selector: 'app-blucake-home-detalhe',
  templateUrl: './blucake-home-detalhe.component.html',
  styleUrls: ['./blucake-home-detalhe.component.css']
})
export class BlucakeHomeDetalheComponent implements OnInit {

  boloClicado = {};
  usuario = {};

  constructor(private bluCakeService: BluCakeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessage().subscribe(ret => {
      this.boloClicado = ret;
      this.usuario = ret.usuario;
    });
  }


}
