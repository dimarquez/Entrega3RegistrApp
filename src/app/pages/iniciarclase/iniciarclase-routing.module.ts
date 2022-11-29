import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarclasePage } from './iniciarclase.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarclasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarclasePageRoutingModule {}
