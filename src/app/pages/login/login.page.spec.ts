import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';



import { LoginPage } from './Login.page';


describe('Pruebas unitarias Login', () => {

  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        LoginPage
      ]
    }).compileComponents();
  });

  it('1. Carga de la página Login', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
