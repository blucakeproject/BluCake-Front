import { Component, OnInit } from '@angular/core';
import { LoginService } from '../blucake-services/login.service';
import { StorageService } from '../blucake-services/storage.service';

@Component({
  selector: 'app-blucake-navbar',
  templateUrl: './blucake-navbar.component.html',
  styleUrls: ['./blucake-navbar.component.css']
})
export class BlucakeNavbarComponent implements OnInit {

  mostrarMenu: boolean;

  constructor(private loginServie: LoginService,
              private storageService: StorageService) { }

  ngOnInit() {

    if (this.storageService.getLocalUser()) {
      this.mostrarMenu = true;
    }


    this.loginServie.usuarioLogado.subscribe(retorno => {
      this.mostrarMenu = retorno;
    });
  }
}
