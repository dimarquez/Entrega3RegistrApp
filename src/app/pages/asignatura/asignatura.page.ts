import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  auxiliar: boolean = true;
  horario: any[]=[{
    tipo_horario:'Diurno'
  },
  {
    tipo_horario:'Vespertino'
  },];

clase = new FormGroup({
  id : new FormControl(''),
  cod_clase: new FormControl(''),
  nombre:new FormControl('',),
  sigla_asignatura: new FormControl(''),
  semestre: new FormControl(''),
  usuario: new FormGroup({
    nombre: new FormControl(''),
    
  }),
  asistencia:new FormControl(''),
  horario: new FormControl('this.horario'),
});
clases: any[]=[];
/* KEY_CLASES ='clases'; */

//docente: any;
usuarios: any[]=[];
docentes: any[]=[];


constructor(
  private loadingCtrl: LoadingController,
  private fireService:FireService) { }

ngOnInit() {
  this.listar();
  this.cargarClases();
  console.log(this.cargarClases)
  console.log(this.listar)
}
listar(){
    this.fireService.getDatos('usuarios').subscribe(
      (data:any) => {
        this.usuarios = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
          this.docentes = this.usuarios.filter(u => u.tipo_usuario == 'docente');
          //console.log(u.payload.doc.data());
        }
      }
    );

}
cargarClases(){
    this.fireService.obtenenAsignaturas('clases').subscribe(
      (dataa:any) => {
        this.clases = [];
        for(let c of dataa){
          let claseJson = c.payload.doc.data();
          claseJson['id'] = c.payload.doc.id;
          this.clases.push(claseJson);
          console.log(claseJson.nombre)
          //console.log(u.payload.doc.data());
        }
      }
    );
  }

async crearClase(){
var respuesta = await this.fireService.agregarClase('clases', this.clase.value);
this.clase.value.id = respuesta
this.fireService.agregar('clases',respuesta)
if (respuesta) {
  alert('clase creada!');
 this.cargarClases();
 console.log(this.cargarClases)
} else {
  /* console.log(respuesta) */
  alert('clase ya existe!');
}

}
eliminarClase(id){
    this.fireService.eliminarClases('clases',id);
    this.cargando('actualizando clases...');
    this.cargarClases();
  }

buscarClase(cod_clase){
  let claseEncontrada = this.fireService.obtenenAsignatura('clases', cod_clase);
  claseEncontrada.subscribe(
    (response: any) =>{
      console.log(response.data());
      let clase = response.data();
      clase['id'] = response.id;
      console.log(clase.nombre,'nombre de la clase')

      this.clase.setValue( clase );
    }
  );
}

modificarClase(){
  let id = this.clase.controls.id.value;
  let claseModific={
    cod_clase: this.clase.controls.cod_clase.value, 
    nombre: this.clase.controls.nombre.value,
    sigla_asignatura: this.clase.controls.sigla_asignatura.value,
    semestre: this.clase.controls.semestre.value,
    usuario: this.clase.controls.usuario.value,
    horario: this.clase.controls.horario.value,
    asistencia: this.clase.controls.asistencia.value

    
  }
  this.clase.removeControl('id')

  this.fireService.modificarClases('clases', id, claseModific);
  this.clase.addControl
}

limpiar(){
  this.clase.reset();
}
async cargando(mensaje){
  const loading = await this.loadingCtrl.create({
    message: mensaje,
    duration: 1000
  });
  loading.present();
}
}

