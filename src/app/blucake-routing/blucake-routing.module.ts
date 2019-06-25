import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlucakeHomeComponent } from '../blucake-home/blucake-home.component';
import { BlucakeUsuarioComponent } from '../blucake-usuario/blucake-usuario.component';
import { AuthGuard } from '../guard/auth.guard';
import { BlucakeReceitasComponent } from '../blucake-receitas/blucake-receitas.component';
import { BlucakeIngredientesComponent } from '../blucake-ingredientes/blucake-ingredientes.component';
import { BlucakeReceitasDetalheComponent } from '../blucake-receitas/blucake-receitas-detalhe/blucake-receitas-detalhe.component';



const routes: Routes = [
  {path: 'home', component: BlucakeHomeComponent},
  {path: 'usuario', component: BlucakeUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'receitas', component: BlucakeReceitasComponent, canActivate: [AuthGuard]},
  {path: 'receitasDetalhe', component: BlucakeReceitasDetalheComponent, canActivate: [AuthGuard]},
  {path: 'ingredientes', component: BlucakeIngredientesComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', redirectTo: '/home'}
];



@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class BlucakeRoutingModule { }
