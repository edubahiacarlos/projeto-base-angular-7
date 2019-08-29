import { AcessoAutenticadoGuard } from './../guards/acesso-autenticado.guard';
import { AcessoAutorizadoGuard } from './../guards/acesso-autorizado.guard';
import { FuncionalidadeGuard } from './funcionalidade.guard';
import { FuncionalidadeFormComponent } from './funcionalidade-form/funcionalidade-form.component';
import { FuncionalidadeComponent } from './funcionalidade.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: FuncionalidadeComponent },
  { path: 'novo',
    component: FuncionalidadeFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { funcionalidade: FuncionalidadeGuard }
  },
  { path: 'editar/:id',
    component: FuncionalidadeFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { funcionalidade: FuncionalidadeGuard }
  },
  { path: 'visualizar/:id',
    component: FuncionalidadeFormComponent,
    canActivateChild: [AcessoAutenticadoGuard, AcessoAutorizadoGuard],
    resolve: { funcionalidade: FuncionalidadeGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionalidadeRoutingModule { }
