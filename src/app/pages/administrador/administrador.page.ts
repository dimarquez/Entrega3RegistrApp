import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

 //variables de pruebas unitarias:
 v_agregar: boolean = false;
 auxiliar: boolean = true;

 //variable:
 usuario = new FormGroup({
   id: new FormControl(''),
   rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
   nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
   ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
   fecha_nac: new FormControl('', [Validators.required]),
   //solo se validan correos de alumnos.
   correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
   clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
   //el tipo de usuario cuando se registrar en solo del tipo alumno.
   tipo_usuario: new FormControl('', [Validators.required]),
 });
 repetir_clave: string;

 usuarios: any[] = [];

 constructor(private fireService: FireService, private validaciones: ValidacionesService) {}

 ngOnInit(){
   this.listar();
 }

 listar(){
  this.fireService.getDatos('usuarios').subscribe(
    (data:any) => {
      this.usuarios = [];
      for(let u of data){
        let usuarioJson = u.payload.doc.data();
        usuarioJson['id'] = u.payload.doc.id;
        this.usuarios.push(usuarioJson);
        console.log(usuarioJson.rut)
        //console.log(u.payload.doc.data());
      }
    }
  );
}

 //métodos del crud:
 agregar(){
  if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
    alert('Rut incorrecto!');
    return;
  }
  //validación de salida para verificar que persona tenga al menos 17 años.
  if (!this.validaciones.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
    alert('Edad mínima 17 años!');
    return;
  }
  //validación de coincidencia de contraseñas.
  if (this.usuario.controls.clave.value != this.repetir_clave) {
    alert('Contraseñas no coinciden!');
    return;
  }
  // var respuesta: boolean = this.fireService.agregar('usuarios', this.usuario.value)
  
  // if(respuesta){
    var respuesta = this.fireService.agregar('usuarios', this.usuario.value);
    console.log(respuesta)
    if (respuesta) {
      alert('Usuario registrado!');
      this.usuario.reset();
      this.repetir_clave = '';

      this.listar();
    } else {
      alert('Usuario ya existe!');
    }
  
   
 }


 eliminar(id){
  this.fireService.eliminar('usuarios', id);
}

buscar(rut){
  let usuarioEncontrado = this.fireService.getDato('usuarios', rut);
  
  usuarioEncontrado.subscribe(
    (response: any) => {
      //console.log(response.data());
      let usu = response.data();
      usu['id'] = response.id;
      console.log(usu.rut);

      this.usuario.setValue( usu );
    }
  );
}

modificar(){
  let id = this.usuario.controls.id.value;
  let usuModificado = {
        rut: this.usuario.controls.rut.value,
        nombre: this.usuario.controls.nombre.value,
        ap_paterno: this.usuario.controls.ap_paterno.value,
        fecha_nac: this.usuario.controls.fecha_nac.value,
        correo: this.usuario.controls.correo.value,
        
        // semestre: this.usuario.controls.semestre.value,
        clave: this.usuario.controls.clave.value,
        tipo_usuario: this.usuario.controls.tipo_usuario.value
      }
      // this.usuario.removeControl('id')

  
  //this.usuario.removeControl('id')
  console.log(this.usuario.value)
  
  this.fireService.modificar('usuarios', id, usuModificado);
  // this.usuario.addControl;
}



   //this.usuario.removeControl('id')
   //console.log(this.usuario.value)

}
