import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-miscursos',
  templateUrl: './miscursos.page.html',
  styleUrls: ['./miscursos.page.scss'],
})
export class MiscursosPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private loadingCtrl: LoadingController,private fireService:FireService) { }
  rut: string;
  clases:any[]=[];
  clase: any;
  CLASES = 'clases'

  asistencias: any[]=[];
  asisntencia: any;
  ASISTENCIAS = 'asistencias'

  Qrcode: any;

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    await this.cargarClases();
    await this.cargarAsistencias();
  }

async cargarClases(){
  this.fireService.obtenenAsignaturas('clases').subscribe(
   (data:any) => {
     this.clases = [];
     for(let c of data){
       let claseJson = c.payload.doc.data();
       claseJson['id'] = c.payload.doc.id;
       this.clases.push(claseJson);
     }
   }
 );
}

cargarAsistencias(){
  this.fireService.obtenerAsistencias('asistencias').subscribe(
   (data:any) => {
     this.asistencias = [];
     for(let a of data){
       let asistenciaJson = a.payload.doc.data();
       this.asistencias.push(asistenciaJson);
     }
   }
 );
}

/* cargarAsistencia(){
  this.fireService.obtenerAsistencia('asistencia',).
} */

ingresarAsistencia(){
  //console.log(this.rut): verificar el rut
    this.fireService.agregarAlumnoASIST(this.ASISTENCIAS, this.Qrcode,this.rut);
    this.cargando('Ingresando a la asistencia...');
}
async cargando(mensaje){
  const loading = await this.loadingCtrl.create({
    message: mensaje,
    duration: 1000
  });
  loading.present();
}

}
