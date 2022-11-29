import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';



import { AuthGuard } from './auth.guard';


// describe('Pruebas unitarias AuthGuard', () => {

//   beforeEach( async ()=>{
//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         FormsModule,
//         AngularFireModule.initializeApp(environment.firebaseConfig)
//       ],
//       declarations: [
//         AuthGuard
//       ]
//     }).compileComponents();
//   });

//   it('1. Carga AuthGuard', ()=>{
//     const fixture = TestBed.createComponent(AuthGuard);
//     const app = fixture.componentInstance;

//     expect(app).toBeTruthy();
//   });
// });
