import { IngredienteService } from './blucake-services/ingredientes.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

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

import { BluCakeService } from './blucake-services/blucake.service';
import { BlucakeHomeDetalheComponent } from './blucake-home/blucake-home-detalhe/blucake-home-detalhe.component';
import { EnviarEmailService } from './blucake-services/enviar-email';
import { MessageService } from './blucake-services/MessageService';
import { BlucakeEnviarEmailComponent } from './blucake-enviar-email/blucake-enviar-email.component';

@NgModule({
  declarations: [
    AppComponent,
    BlucakeHomeComponent,
    BlucakeLoginComponent,
    BlucakeUsuarioComponent,
    BlucakeNavbarComponent,
    BlucakeReceitasComponent,
    BlucakeIngredientesComponent,
    BlucakeHomeDetalheComponent,
    BlucakeEnviarEmailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BlucakeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
      ],
  providers: [LoginService,
              StorageService,
              UsuarioService,
              AuthGuard,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
              HomeService,
              IngredienteService,
              BluCakeService,
              EnviarEmailService,
              MessageService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
