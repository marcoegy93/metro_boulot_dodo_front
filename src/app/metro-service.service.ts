import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gare } from './Modele/gare';

@Injectable({
  providedIn: 'root'
})
export class MetroServiceService {
 // readonly ApiUrl = "https://metro-efrei.herokuapp.com/api/Metro/"
 readonly ApiUrl = "https://localhost:7141/api/Metro/"
 
  constructor(private http: HttpClient) { }


  async getArbre() : Promise<String>{
    var t : string = ''
   await this.http.get(this.ApiUrl+'Retourarbre').toPromise().then((data) =>{
    

   } ).catch((e)=>{
   

    t = e.error.text
   })
    return t
  }

  async getRoute(garfe1 : gare, gare2: gare) : Promise<String>{
    var t : string = ''
   await this.http.get(this.ApiUrl+'Dijstra/'+garfe1.id+'/'+gare2.id).toPromise().then((data) =>{
   } ).catch((e)=>{
    
    t = e.error.text
   })

    return t
  }

  async getAllGare() : Promise<String>{
    var t : string = ''
   await this.http.get(this.ApiUrl+'Crearbre').toPromise().then((data) =>{
   
   } ).catch((e)=>{
    
    t = e.error.text
   })

    return t
  }

  async IsConnex(): Promise<boolean>{
    let isConnex : boolean = false
    await this.http.get(this.ApiUrl+'isConnexe').toPromise().then((data) =>{
      isConnex = data as boolean
      console.log(data)
    })
    return isConnex
  }

  async getAcpm() : Promise<String>{
    var t : string = ''

   await this.http.get(this.ApiUrl+'ACPM').toPromise().then((data) =>{
   } ).catch((e)=>{
    t = e.error.text
   })
    return t
  }

  async getAcpmGare() : Promise<String>{
    var t : string = ''

   await this.http.get(this.ApiUrl+'ACPMGARE').toPromise().then((data) =>{
   } ).catch((e)=>{
    t = e.error.text
   })
    return t
  }

}
