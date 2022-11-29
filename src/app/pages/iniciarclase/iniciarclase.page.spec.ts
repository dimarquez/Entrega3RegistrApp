import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';



import { IniciarclasePage } from './iniciarclase.page';


describe('Pruebas unitarias IniciarClase', () => {

  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        IniciarclasePage
      ]
    }).compileComponents();
  });

  it('1. Carga de la página IniciarClase', ()=>{
    const fixture = TestBed.createComponent(IniciarclasePage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
