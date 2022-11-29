import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';



import { MiscursosPage } from './miscursos.page';


describe('Pruebas unitarias Miscursos', () => {

  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        MiscursosPage
      ]
    }).compileComponents();
  });

  it('1. Carga de la página Miscursos', ()=>{
    const fixture = TestBed.createComponent(MiscursosPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
