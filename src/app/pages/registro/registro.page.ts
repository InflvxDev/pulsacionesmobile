import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/models/persona';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  persona: persona;
  constructor() {
    this.persona = new persona();
   }

  ngOnInit() {
  }

  onSubmitTemplate(){
    console.log("Form submit");
    this.calcularpulsacion();
    console.log(this.persona);
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
