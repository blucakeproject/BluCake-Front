import { IngredienteService } from './blucake-services/ingredientes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BlucakeRoutingModule } from './blucake-routing/blucake-routing.module';
import { BlucakeHomeComponent } from './blucake-home/blucake-home.component';
import { BlucakeLoginComponent } from './blucake-login/blucake-login.component';
import { BlucakeUsuarioComponent } from './blucake-usuario/blucake-usuario.component';
import { BlucakeNavbarComponent } from './blucake-navbar/blucake-navbar.component';
import { LoginService } from './blucake-services/login.service';
import { StorageService } from './blucake-services/storage.service';
import { AuthGuard } from './guard/auth.guard';
import { UsuarioService } from './blucake-services/usuario.service';
import { AuthInterceptor } from './interceptors.ts/auht.interceptors';
import { HomeService } from './blucake-services/home.service';
import { BlucakeReceitasComponent } from './blucake-receitas/blucake-receitas.component';
import { BlucakeIngredientesComponent } from './blucake-ingredientes/blucake-ingredientes.component';
import { IngredienteDetalheComponent } from './blucake-ingredientes/ingrediente-detalhe/ingrediente-detalhe.component';
import { BluCakeService } from './blucake-services/blucake.service';

@NgModule({
  declarations: [
    AppComponent,
    BlucakeHomeComponent,
    BlucakeLoginComponent,
    BlucakeUsuarioComponent,
    BlucakeNavbarComponent,
    BlucakeReceitasComponent,
    BlucakeIngredientesComponent,
    IngredienteDetalheComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BlucakeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
      ],
  providers: [LoginService,
              StorageService,
              UsuarioService,
              AuthGuard,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
              HomeService,
              IngredienteService,
              BluCakeService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
