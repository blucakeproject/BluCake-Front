import { Component, OnInit } from '@angular/core';
import { HomeService } from '../blucake-services/home.service';

@Component({
  selector: 'app-blucake-home',
  templateUrl: './blucake-home.component.html',
  styleUrls: ['./blucake-home.component.css']
})
export class BlucakeHomeComponent implements OnInit {

  records;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.ativarTabela();
  }

  ativarTabela() {
    this.homeService.buscarTodosHome().subscribe(res => {
      this.records = res.data;
    });
  }

}
