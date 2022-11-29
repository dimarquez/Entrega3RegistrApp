import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario = new FormGroup({
    id: new FormControl(''),
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    //solo se validan correos de alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
  });
  
  
  usuarios:any [] =[];


  clase: any = {};
  clases:any [] =[];


  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    
    private fireService:FireService) {}

ngOnInit() {
  this.usuario.value.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.usuario.value.rut = this.activatedRoute.snapshot.paramMap.get('rut');

  this.fireService.getDato('usuarios', this.usuario.value.id).subscribe(
    (data : any)=>{
      this.usuarios = [];
      let usuarioJson = data.payload.doc.data();
      usuarioJson['id'] = data.payload.doc.id;
      this.usuarios.push(usuarioJson);
    }

  );


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
}


