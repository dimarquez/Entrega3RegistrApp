import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //variables de pruebas unitarias:
  
  auxiliar: boolean = true;

  //variable:
  
 

  constructor(private fireService: FireService, private router: Router) {}

  ngOnInit(){
    this.usuarios = this.router.getCurrentNavigation().extras.state.usuario;
    
    console.log(this.usuario)
  }

  usuarios: any[] = [];
  usuario : any;
  //métodos del crud:

 
  

  logout(){
    this.fireService.logout();
  }

 
}
