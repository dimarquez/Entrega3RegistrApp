import { Injectable } from '@angular/core';

//import para utilizar fireStore:
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  isAuthenticated =  new BehaviorSubject(false);

  datos: any[] = [];
  dato: any = {};
  constructor(private fire: AngularFirestore, private router: Router) { }


  
  users : any [];
  //A través de estos metodos se realizan los distintos CRUD de cada alumno, profesor, "administrador", asistencia y asignatura. 
  agregar(coleccion, value){
    try {
      
      console.log(this.fire.collection(coleccion).get(value), 'valor entregado')
      console.log(value.rut, 'rut que esta pasando')
      console.log('lista de weones')
      console.log(coleccion,'coleccion')
      
      // let existe = this.getDato(colleccion, value.id)
      // var dato = this.getDato(colleccion, value); 
      // console.log(existe,'que pasa aqui=')
      // if(existe){ 
        
        return this.fire.collection(coleccion).add(value) 
      // }else{
      //   return false;
      // }
    } catch (error) {
      console.log('ERROR: ', error)
      return false;
    }
  }

  getDato(coleccion, id){
    try {
      var datos = this.fire.collection(coleccion).doc(id).get(); 
      console.log(datos,'que wea esta pasando')
      return datos
      
      
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  getDatos(coleccion){
    try {
      
      var datos = this.fire.collection(coleccion).snapshotChanges();
      return datos
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  eliminar(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  modificar(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  getAuth(){
    return this.isAuthenticated.value;
  }

  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  validameRutContra(rut, pass){
    return this.users.find(u => u.rut == rut && u.password == pass);
  }

//METODOS PARA LAS ASIGNATURAS 
async agregarClase(colleccion, value){
  try {
    var aux = await this.fire.collection(colleccion).add(value);
    return aux.id;

    //this.fire.collection(collecction).doc(value.rut);
  } catch (error) {
    console.log('ERROR: ', error);
  }    
}
  
obtenenAsignatura(colleccion, id){
  try {
   var datos = this.fire.collection(colleccion).doc(id).get();
   console.log(datos, 'que wea esta pasando') 
   return datos
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

obtenenAsignaturas(colleccion){
    try {
      var datos = this.fire.collection(colleccion).snapshotChanges(); 
      return datos
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  
  
  eliminarClases(colleccion, id){
    try {
      this.fire.collection(colleccion).doc(id).delete();
    } catch (error) {
      console.log('ERROR: ',error)
    }
  }
  
  modificarClases(colleccion,id,value){
    try {
      this.fire.collection(colleccion).doc(id).set(value);
    } catch (error) {
      console.log('ERROR: ',error)
    }
  }

  agregarAsistencia(coleccion, value){
    try {
      var datitos = this.fire.collection(coleccion).add(value);
      return datitos;
      //this.fire.collection(collecction).doc(value.rut);
    } catch (error) {
      console.log('ERROR: ', error);
  
    }    
  }
  obtenerAsistencias(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  obtenerAsistencia(coleccion, id){
    try {
     return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }
  
  agregarAlumnoASIST(coleccion,id,value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log('ERROR: ',error)
    }
  }
  
  
  

}

  
  
/* getDatos2(colleccion){
    try {
      this.fire.collection(colleccion).snapshotChanges().subscribe(
        data => {
          this.datos = [];
          for(let d of data){
            this.datos.push(d.payload.doc.data());
          }
        }
      );
    } catch (error) {
      console.log('ERROR: ', error)
    }
  } */
