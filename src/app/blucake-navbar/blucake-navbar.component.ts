import { Component, OnInit } from '@angular/core';
import { LoginService } from '../blucake-services/login.service';
import { StorageService } from '../blucake-services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blucake-navbar',
  templateUrl: './blucake-navbar.component.html',
  styleUrls: ['./blucake-navbar.component.css']
})
export class BlucakeNavbarComponent implements OnInit {

  mostrarMenu: boolean;

  constructor(private loginServie: LoginService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {

    if (this.storageService.getLocalUser()) {
      this.mostrarMenu = true;
    }


    this.loginServie.usuarioLogado.subscribe(retorno => {
      this.mostrarMenu = retorno;
    });
  }

  deslogar() {
    this.loginServie.noSuccessfulLogin();
    this.router.navigate(['/home']);
  }
}
