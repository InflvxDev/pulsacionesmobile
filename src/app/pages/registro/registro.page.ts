import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/models/persona';
import { DatabaseService } from '../../service/database.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  persona: persona;
  personas : any = [];
  editMode: boolean = false;
  constructor(public  database: DatabaseService) {
    this.database.createDatabase().then(() => {
      this.getPersonas();
    });
    this.persona = new persona();
   }

  ngOnInit() {
  }

  // onSubmitTemplate(){
  //   console.log("Form submit");
  //   this.calcularpulsacion();
  //   console.log(this.persona);

  //   this.database.addPersona(this.persona).then((data) => {
  //     alert(data);
  //     this.getPersonas();
  //   });
  // }

  addPersonas() {
    if (this.editMode == true) {
      this.calcularpulsacion();
      this.database
        .editPersona(this.persona)
        .then((data) => {
          (this.editMode = false);
          alert(data);
          this.getPersonas();
        });
    } 
    else { 
      this.calcularpulsacion(); 
      this.database.addPersona(this.persona).then((data) => {
        alert(data);
        this.getPersonas();
      });
    }
  }

  getPersonas() {
    this.database.getPersona().then((data) => {
      this.personas = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.personas.push(data.rows.item(i));
        }
      }
    });
  }

  deletePersona(cedula: number) {
    this.database.deletePersona(cedula).then((data) => {
      alert(data);
      this.getPersonas();
    });
  }

  editPersona(personaedit : persona) {
    this.editMode = true;
    this.persona.cedula = personaedit.cedula;
    this.persona.nombre = personaedit.nombre
    this.persona.apellido = personaedit.apellido;
    this.persona.edad= personaedit.edad;
    this.persona.genero = personaedit.genero;
    this.persona.pulsacion = personaedit.pulsacion;
    
  }

  
  calcularpulsacion(){

    if (this.persona.genero === "Femenino"){
      this.persona.pulsacion = (220 - this.persona.edad)/10
    }
    else{
      this.persona.pulsacion = (210 - this.persona.edad)/10
    }
    
  }

}
