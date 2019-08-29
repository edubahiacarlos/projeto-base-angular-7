import { AcessoAutorizadoGuard } from './../guards/acesso-autorizado.guard';
import { AcaoGuard } from './acao.guard';
import { AcessoAutenticadoGuard } from './../guards/acesso-autenticado.guard';
import { AcaoFormComponent } from './acao-form/acao-form.component';
import { AcaoComponent } from './acao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AcaoComponent },
  { path: 'novo',
    component: AcaoFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutenticadoGuard],
    resolve: { acao: AcaoGuard }
  },
  { path: 'editar/:id',
    component: AcaoFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { acao: AcaoGuard }
  },
  { path: 'visualizar/:id',
    component: AcaoFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { acao: AcaoGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcaoRoutingModule { }
