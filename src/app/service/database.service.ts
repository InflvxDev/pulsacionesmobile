import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  databaseObj: SQLiteObject;
  tables = {
    personas: "personas"
  }
  constructor(private sqlite: SQLite) { }

  async createDatabase() {
    await this.sqlite
      .create({
        name: "Pulsaciones",
        location: "default",
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert("error on creating database " + JSON.stringify(e));
      });

    await this.createTables();
  }


  async createTables(){
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.personas} (
        cedula NUMERIC PRIMARY KEY , 
        nombre VARCHAR (255) , 
        apellido VARCHAR (255) ,
        edad NUMERIC ,
        genero CHAR ,
        pulsacion NUMERIC
        )` , []
    )
  }

  async addPersona(persona: persona){
    return this.databaseObj.executeSql(
      `INSERT INTO ${this.tables.personas} (cedula,nombre,apellido,edad,genero,pulsacion) 
      VALUES ('${persona.cedula}','${persona.nombre}','${persona.apellido}','${persona.edad}','${persona.genero}','${persona.pulsacion}')`,[]
    ).then(() => {
      return "Persona creadad";
    })
    .catch((e) => {
      if (e.code === 6) {
        return "La persona ya existe";
      }

      return "error en crear la persona " + JSON.stringify(e);
    });
  }

  async getPersona() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.personas} ORDER BY cedula ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error al obtener las personas " + JSON.stringify(e);
      });
  }

  async deletePersona(cedula: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.personas} WHERE cedula = ${cedula}`, [])
      .then(() => {
        return "Persona borrada";
      })
      .catch((e) => {
        return "error en borra a la persona " + JSON.stringify(e);
      });
  }

  async editPersona(persona: persona) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.personas} SET nombre = '${persona.nombre}', 
        apellido = '${persona.apellido}' ,
        edad = '${persona.edad}',
        genero = '${persona.genero}',
        pulsacion = '${persona.pulsacion}'
        WHERE cedula = ${persona.cedula}`,
        []
      )
      .then(() => {
        return "Persona actualizada";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "Persona ya existe";
        }

        return "error al actualizar la persona " + JSON.stringify(e);
      });
  }
}
