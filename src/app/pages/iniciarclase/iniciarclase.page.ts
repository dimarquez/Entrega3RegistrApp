import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-iniciarclase',
  templateUrl: './iniciarclase.page.html',
  styleUrls: ['./iniciarclase.page.scss'],
})
export class IniciarclasePage implements OnInit {

  
  elementType = 'canvas';
  value = '';

  asistencia= new FormGroup({
    id: new FormControl(''),
    cod_asist:  new FormControl(''),
    elementType: new FormControl('canvas'),
       
      });


  
  clase: any;
  clases: any[]=[];


  docentes:any[]=[];
  usuario: any;


  asistencias:any[]=[];
  usuarios:any[]=[];
  rut: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private fireService:FireService){}

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.listar();
    this.cargarAsistencia();
  }

  listar(){
    this.fireService.getDatos('usuarios').subscribe(
      (data:any) => {
        this.usuarios = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
          this.docentes = this.usuarios.filter(u => u.tipo_usuario == 'profesor');
        }
      }
    );
  }
  cargarAsistencia(){
     this.fireService.obtenerAsistencias('asistencias').subscribe(
      (dataaa:any) => {
        this.asistencias = [];
        for(let c of dataaa){
          let asistenciaJson = c.payload.doc.data();
          asistenciaJson['id'] = c.payload.doc.id;
          this.clases.push(asistenciaJson);
          // this.clases = this.clases.filter(c => c.usuario == this.rut)
        }
      }
    );
  }

async generarCodigo(cod_class){
/*     this.clases = await this.userService.obtenerClaseDocente(this.KEY_CLASES, rut); */
    

    if(this.asistencia.value.cod_asist == ''){
      this.asistencia.value.cod_asist = v4()
      cod_class = v4()
      console.log(v4())
      var respuesta = await this.fireService.agregarAsistencia('asistencia', this.asistencia.value);
    
    console.log(respuesta)
    // this.asistencia.cod_asist=respuesta
    // console.log(this.asistencia.cod_asist)
    // this.clase.asistencia=respuesta
    // this.fireService.modificar('clases',cod_class,this.clase)
    // this.fireService.modificar('asistencia',respuesta,this.asistencia)
    if(respuesta){
      this.cargando('Creando asistencia...');
      this.cargarAsistencia();
      console.log(respuesta)
    }else{
      alert('la asistencia de hoy ya está creada!')
      console.log(respuesta)
      console.log(this.asistencia)
    }
    }
  }

  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }
}
