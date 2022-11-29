import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HomePage } from './home.page';

//creación del archivo de pruebas con su título:
describe('Pruebas unitarias home', () => {

  //preparación de los elementos necesarios para hacer pruebas unitarias:
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        HomePage
      ]
    }).compileComponents();
  });

  //GENERAMOS NUESTRAS PRUEBAS UNITARIAS:

  //lista
  it('1. Carga de la página Home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
  

});