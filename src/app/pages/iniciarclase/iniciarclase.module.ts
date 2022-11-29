import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarclasePageRoutingModule } from './iniciarclase-routing.module';

import { IniciarclasePage } from './iniciarclase.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarclasePageRoutingModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  declarations: [IniciarclasePage]
})
export class IniciarclasePageModule {}
