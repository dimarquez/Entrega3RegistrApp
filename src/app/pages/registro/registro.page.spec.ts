import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { identity } from 'rxjs';
import { environment } from 'src/environments/environment';



import { RegistroPage } from './registro.page';


describe('Pruebas unitarias registro', () => {

  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        RegistroPage
      ]
    }).compileComponents();
  });

  it('1. Carga de la página Registro', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
  //lista

  it('2. Formulario inválido', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nombre'];
    let ap_paterno = app.usuario.controls['ap_paterno'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let correo = app.usuario.controls['correo'];
    let clave = app.usuario.controls['clave'];
    let tipo_usuario = app.usuario.controls['tipo_usuario'];
    
    rut.setValue('20.704.119-K');
    nombre.setValue('Patricio');
    ap_paterno.setValue('Fernandez');
    fecha_nac.setValue('24-01-2001');
    correo.setValue('testing@duocucc.cl');
    clave.setValue('123456');
    tipo_usuario.setValue('alumno');
    
    expect(app.usuario.invalid).toBeTrue();
  });
  
  //lista  
  it('3. Formulario válido', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nombre'];
    let ap_paterno = app.usuario.controls['ap_paterno'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let correo = app.usuario.controls['correo'];
    let clave = app.usuario.controls['clave'];
    let tipo_usuario = app.usuario.controls['tipo_usuario'];
    
    rut.setValue('20.704.119-K');
    nombre.setValue('PersonaTest');
    ap_paterno.setValue('PersonaTest');
    fecha_nac.setValue('24-01-2001');
    correo.setValue('testing@duocuc.cl');
    clave.setValue('123456');
    tipo_usuario.setValue('alumno');


    expect(app.usuario.valid).toBeTrue();
  });
  
  
  it('4. Ejecutar un boton/método agregar', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let rut = app.usuario.controls['rut'];
    let nombre = app.usuario.controls['nombre'];
    let ap_paterno = app.usuario.controls['ap_paterno'];
    let fecha_nac = app.usuario.controls['fecha_nac'];
    let correo = app.usuario.controls['correo'];
    let clave = app.usuario.controls['clave'];
    let tipo_usuario = app.usuario.controls['tipo_usuario'];
    

    rut.setValue('20.704.119-K');
    nombre.setValue('PersonaTest');
    ap_paterno.setValue('PersonaTest');
    fecha_nac.setValue('24-01-2001');
    correo.setValue('testing@duocuc.cl');
    clave.setValue('123456');
    tipo_usuario.setValue('alumno');

    app.agregar();

    
    
    expect(app.auxiliar).toBeTrue();
  });

  it('5. largo del arreglo de personas', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    expect(app.usuarios.length).toBeGreaterThanOrEqual(0);
  });

  // it('5. Ejecutar un metodo buscar', ()=>{
  //   const fixture = TestBed.createComponent(RegistroPage);
  //   const app = fixture.componentInstance;

  //   let id = app.usuario.controls['id'];
  //   let rut = app.usuario.controls['rut'];
  //   let nombre = app.usuario.controls['nombre'];
  //   let ap_paterno = app.usuario.controls['ap_paterno'];
  //   let fecha_nac = app.usuario.controls['fecha_nac'];
  //   let correo = app.usuario.controls['correo'];
  //   let clave = app.usuario.controls['clave'];
  //   let tipo_usuario = app.usuario.controls['tipo_usuario'];
    

  //   rut.setValue('20.704.119-K');
  //   nombre.setValue('PersonaTest');
  //   ap_paterno.setValue('PersonaTest');
  //   fecha_nac.setValue('24-01-2001');
  //   correo.setValue('testing@duocuc.cl');
  //   clave.setValue('123456');
  //   tipo_usuario.setValue('alumno');

  //   id.getRawValue();
  //   rut.getRawValue();
  //   nombre.getRawValue();
  //   ap_paterno.getRawValue();
  //   fecha_nac.getRawValue();
  //   correo.getRawValue();
  //   clave.getRawValue();
  //   tipo_usuario.getRawValue();



  //   app.buscar(rut);

    
    
  //   expect(app.auxiliar).toBeTrue();
  // });

});
