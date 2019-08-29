import { AcessoAutorizadoGuard } from './../guards/acesso-autorizado.guard';
import { AcessoAutenticadoGuard } from './../guards/acesso-autenticado.guard';
import { UsuarioComponent } from './usuario.component';
import { UsuarioGuard } from './usuario.guard';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


const APP_ROUTES: Routes = [
    { path: '', component: UsuarioComponent },
    { path: 'novo',
      component: UsuarioFormComponent,
      canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
      resolve: { usuario: UsuarioGuard }
    },
    { path: 'editar/:id',
      component: UsuarioFormComponent,
      canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
      resolve: { usuario: UsuarioGuard }
    },
    { path: 'visualizar/:id',
      component: UsuarioFormComponent,
      canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
      resolve: { usuario: UsuarioGuard } },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(APP_ROUTES),
  ]
})
export class UsuarioRoutingModule { }
