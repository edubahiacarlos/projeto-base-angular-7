import { AcessoAutorizadoGuard } from './guards/acesso-autorizado.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { AcessoAutenticadoGuard } from './guards/acesso-autenticado.guard';

const routes: Routes = [
  { data: {'title': 'Login', 'mapeado': false },
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  { data: {'title': 'Usuário', 'mapeado': true},
    path: 'usuario',
    loadChildren: './usuario/usuario.module#UsuarioModule',
    canActivate: [AcessoAutenticadoGuard, AcessoAutorizadoGuard]
  },
  { data: {'title': 'Funcionalidade', 'mapeado': true},
    path: 'funcionalidade',
    loadChildren: './funcionalidade/funcionalidade.module#FuncionalidadeModule',
    canActivate: [ AcessoAutenticadoGuard, AcessoAutorizadoGuard ]
  },
  { data: {'title': 'Perfil', 'mapeado': true},
    path: 'perfil',
    loadChildren: './perfil/perfil.module#PerfilModule',
    canActivate: [ AcessoAutenticadoGuard, AcessoAutorizadoGuard ]
  },
  { data: {'title': 'Ação', 'mapeado': true },
    path: 'acao',
    loadChildren: './acao/acao.module#AcaoModule',
    canActivate: [AcessoAutenticadoGuard]
  },
  { data: {'title': 'Alterar Senha', 'mapeado': false },
    path: 'alterarsenha',
    loadChildren: './alterar-senha/alterar-senha.module#AlterarSenhaModule',
  },
  { data: {'title': 'Início', 'mapeado': false },
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AcessoAutenticadoGuard]
  },
  { data: {'title': 'Teste', 'mapeado': false},
    path: 'teste', component: InicioComponent,
    canActivate: [AcessoAutenticadoGuard]
  },
  { data: {'title': 'xx', 'mapeado': false },
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio'
  }
];

@NgModule({
  imports:
  [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
