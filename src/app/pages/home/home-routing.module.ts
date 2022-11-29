import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'administrador',
        loadChildren: () => import('../administrador/administrador.module').then( m => m.AdministradorPageModule),
      },
      {
        path: 'asignaturas',
        loadChildren: () => import('../asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
      },
      {
        path: 'iniciarclase',
        loadChildren: () => import('../iniciarclase/iniciarclase.module').then( m => m.IniciarclasePageModule)
      },
      {
        path: 'miscursos',
        loadChildren: () => import('../miscursos/miscursos.module').then( m => m.MiscursosPageModule)
      }, {
        path: 'perfil/:id',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule),
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
