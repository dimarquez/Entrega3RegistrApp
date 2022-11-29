
import { AdministradorPage } from './administrador.page';

import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';





describe('Pruebas unitarias registro', () => {

  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        AdministradorPage
      ]
    }).compileComponents();
  });

  it('1. Carga de la página Registro', ()=>{
    const fixture = TestBed.createComponent(AdministradorPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
