import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';



import { AsignaturaPage } from './asignatura.page';


describe('Pruebas unitarias asignatura', () => {

  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        AsignaturaPage
      ]
    }).compileComponents();
  });

  it('1. Carga de la página Asignatura', ()=>{
    const fixture = TestBed.createComponent(AsignaturaPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
