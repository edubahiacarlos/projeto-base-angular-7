import { AcessoAutenticadoGuard } from './../guards/acesso-autenticado.guard';
import { AcessoAutorizadoGuard } from './../guards/acesso-autorizado.guard';
import { PerfilGuard } from './perfil.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { Perfil } from '../model/perfil.class';

const routes: Routes = [
  { path: '', component: PerfilComponent },
  { path: 'novo',
    component: PerfilFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { perfil: PerfilGuard }
  },
  { path: 'editar/:id',
    component: PerfilFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { perfil: PerfilGuard } },
  { path: 'visualizar/:id',
    component: PerfilFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { perfil: PerfilGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
