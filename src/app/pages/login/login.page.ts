import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  constructor(private router: Router, private fireService: FireService) { }

  usuarios: any[] = [];

  

  async ngOnInit() {
    await this.listar()
  }

  listar(){
    this.fireService.getDatos('usuarios').subscribe(
      (data : any) => {
        this.usuarios = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
          //console.log(u.payload.doc.data());

          console.log(usuarioJson)
        }
      }
    );
    console.log(this.listar)
  }

  ingresar() {
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.correo.value;
    var claveValidar = this.usuario.controls.clave.value;
    /*console.log(correoValidar)*/
    /*console.log(claveValidar)*/
    //rescatamos el usuario con el método login usuario:
    var usuarioLogin = this.usuarios.find(user => user.correo == correoValidar && user.clave == claveValidar);
    //validamos si existe el usuario
      if(usuarioLogin != undefined){
        //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
        let navigationExtras: NavigationExtras = {
          state: {
            usuario: usuarioLogin
          }
          
          
        };
        console.log(correoValidar)
        console.log(claveValidar)
        
        //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
        this.router.navigate(['/home'], navigationExtras);
        this.fireService.isAuthenticated.next(true);
        console.log(this.fireService.isAuthenticated.next(true));
        return true;

      } else {
        alert('Usuario o contraseña incorrectos!')
      }
        console.log(correoValidar)
        console.log(claveValidar)
        return false;
      
      
  }
 

}
