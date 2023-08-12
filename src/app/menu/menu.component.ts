import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MetroServiceService } from '../metro-service.service';
import { Arrete } from '../Modele/Arrete';
import { gare } from '../Modele/gare';
import { gareToStop } from '../Modele/gareToStop';
import {MatDialog} from '@angular/material/dialog';
import { PopUpMessageComponent } from '../pop-up-message/pop-up-message.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  listArrete : Arrete[]= []
  listMetroImg : string[] =[]
  listGare : gare[] = []
  selectedDepart!: gare | null
  selectedArrivee!: gare | null
  searchDo: boolean = false
  acpmDo: boolean = false
  listeGareToStop : gareToStop[] = []
  dureeTrajet: string = '0 ms' 
  modeSpeed: boolean= false

  @ViewChild('canvas', { static: true }) 
  canvas!: ElementRef<HTMLCanvasElement>

  private ctx!: CanvasRenderingContext2D
  
  constructor(public metroService: MetroServiceService,
    public dialog: MatDialog) { }



  async ngOnInit() {


    this.ctx = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D

    this.listMetroImg.push('ligne1.png')
    this.listMetroImg.push('ligne2.png')
    this.listMetroImg.push('ligne3.png')
    this.listMetroImg.push('ligne3bis.png')
    this.listMetroImg.push('ligne4.png')
    this.listMetroImg.push('ligne5.png')
    this.listMetroImg.push('ligne6.png')
    this.listMetroImg.push('ligne7.png')
    this.listMetroImg.push('ligne7bis.png')
    this.listMetroImg.push('ligne8.png')
    this.listMetroImg.push('ligne9.png')
    this.listMetroImg.push('ligne10.png')
    this.listMetroImg.push('ligne11.png')
    this.listMetroImg.push('ligne12.png')
    this.listMetroImg.push('ligne13.png')
    this.listMetroImg.push('ligne14.png')


    var StingArret 
     await this.metroService.getArbre().then((data) => {
      StingArret = data
      var ListStingArret = StingArret.split("\n")
      this.setListArrete(ListStingArret)
    })
   
    var stringListGare 
    await this.metroService.getAllGare().then((data) => {
      stringListGare =data 
      stringListGare.split("\n").forEach((item) => {
        this.listGare.push({id:Number(item.split(';')[0]), name:item.split(';')[1],pixel:item.split(';')[2], ligne:item.split(';')[3] })
      })
    })
  

   }

  setListArrete(stringArret: string[]){
    this.listArrete = []
    this.ctx.clearRect
    this.ctx.clearRect(0, 0,  this.ctx.canvas.width,  this.ctx.canvas.height);
    stringArret.forEach(stringa => {
    
      if(stringa.split(';')[2]!= undefined ){

        this.listArrete.push({station1:stringa.split(';')[1].trim(),id1: Number(stringa.split(';')[0].trim()),id2: Number(stringa.split(';')[3].trim()),  station2:stringa.split(';')[4].trim(),pixel1:stringa.split(';')[2].trim(),pixel2:stringa.split(';')[5].trim(),ligne:stringa.split(';')[6].trim()})
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.getCouleurLigne(this.listArrete[this.listArrete.length-1].ligne) as string;
        if(this.searchDo)
           this.ctx.lineWidth=7
        else
            this.ctx.lineWidth=2
        
        
        if(!this.acpmDo){
          this.ctx.moveTo(Number(this.listArrete[this.listArrete.length-1].pixel1.split('/')[0]),Number(this.listArrete[this.listArrete.length-1].pixel1.split('/')[1]));
          this.ctx.lineTo(Number(this.listArrete[this.listArrete.length-1].pixel2.split('/')[0]),Number(this.listArrete[this.listArrete.length-1].pixel2.split('/')[1]));
          this.ctx.stroke()
        }
        
      }
    
    });
  }

  

 
  addStyle1(arrete: Arrete){
    return{
      'background-color': this.getCouleurLigne(arrete.ligne) as string ,
      'left.px':Number(arrete.pixel1.split('/')[0]),
      'top.px': Number(arrete.pixel1.split('/')[1])
    }
  }

  addStyle2(arrete: Arrete){
    return{
      'background-color': this.getCouleurLigne(arrete.ligne) as string ,
      'left.px':Number(arrete.pixel2.split('/')[0]),
      'top.px': Number(arrete.pixel2.split('/')[1])
    }
  }


  getLigneLogo(ligne: string) {

  return 'ligne'+ligne.trim()+'.png'
  }

  async getRoute(){
    this.searchDo = true

    this.listArrete = []
    this.listeGareToStop= []
    var stringArret 
     await this.metroService.getRoute((this.selectedDepart as gare),(this.selectedArrivee as gare)).then((data) => {
      stringArret = data
    let dureeMS = Number(stringArret.split("\n")[stringArret.split("\n").length-1])
    var heures = Math.floor(dureeMS / 3600);
    var minutes = Math.floor(dureeMS % 3600 / 60);
    var seconds = Math.floor(dureeMS % 3600 % 60);
    this.dureeTrajet =  `${heures}:${minutes<10 ? '0'+minutes : minutes}:${seconds<10?'0'+seconds:seconds}`
     this.setListArreteWithSleep(stringArret.split("\n"))
      
    })
    
    }

    exist(name: String, ligne: string){
      var find = false
      this.listeGareToStop.forEach((item) => {
        if(item.name == name && this.getLigneLogo(ligne) == item.ligne)
          find = true
      })
      return find
    }

    getCouleurLigne( ligne: string) {
      switch(ligne){
        case '1': return '#FFCC30'
        case '2': return '#006FB6'
        case '3': return '#9B9842'
        case '3bis': return '#8AD3DE'
        case '4': return '#B94E9A'
        case '5': return '#F58F53'
        case '6': return '#7AC597'
        case '7': return '#F49FB3'
        case '7bis': return '#7AC597'
        case '8': return '#C4A4CC'
        case '9': return '#CEC73D'
        case '10': return '#DFAF47'
        case '11': return '#8D653D' 
        case '12': return '#008B5B'
        case '13': return '#8AD3DE'
        case '14': return '#65318F'
        case '15': return '#B6134C'
        case '16': return '#F49FB3'
        case '17': return '#CEC73D'
        case '18': return '#00B297'
        default: return 'red'
      }
    }

   async resetMap(){
    if(!this.searchDo && !this.acpmDo ){
      this.selectedArrivee = null
      this.selectedDepart = null
      return 
    }
    this.acpmDo = false 

      this.searchDo = false

      var StingArret 
       await this.metroService.getArbre().then((data) => {
        StingArret = data 
        var ListStingArret = StingArret.split("\n")
   
        this.setListArrete(ListStingArret)
  
        this.selectedArrivee = null
        this.selectedDepart = null
      })
     
    }

    lineIsUsed(ligne :  String){
      if(this.searchDo){
      let lineUsed = false
      this.listeGareToStop.forEach((item) => {
        if(item.ligne ===ligne)
        lineUsed=true
      })

      if(!lineUsed){
        return{
          'filter': 'blur(0.5rem)'
        }
      }
    }
    return null

  }


  newDestination(name: string){
    this.listGare.forEach((gare) => {
      if(gare.name){
        if(gare.name.trim() === name.trim()){
          if(!this.selectedDepart){
             this.selectedDepart = gare
             return
          }
          if(!this.selectedArrivee){
            this.selectedArrivee = gare
          }
        }
      }
      
    })
  }

  mapSearch(){
    if(this.searchDo)
      return {'filter': 'grayscale(80%)'}
    
    if(this.acpmDo)
      return {'display' : 'none'}
    
      return null
  }

  isConnex(){
    const dialogRef = this.dialog.open(PopUpMessageComponent, {
      width: '250px',
    });
  }

  getACPM(){
    this.resetMap()
    this.ctx.clearRect(0, 0,  this.ctx.canvas.width,  this.ctx.canvas.height);
    this.selectedArrivee = null
    this.selectedDepart = null
    this.searchDo = false 
    this.acpmDo = true
    let stringArret
    this.metroService.getAcpm().then((data) => {
      stringArret= data
      this.setListArreteACPM(stringArret.split("\n"))
    })
  }

  getACPMGare(){
    this.resetMap()
    this.ctx.clearRect(0, 0,  this.ctx.canvas.width,  this.ctx.canvas.height);
    this.selectedArrivee = null
    this.selectedDepart = null
    this.searchDo = false 
    this.acpmDo = true
    let stringArret
    this.metroService.getAcpmGare().then((data) => {
      stringArret= data
      this.setListArreteACPM(stringArret.split("\n"))
    })
  }


 async setListArreteACPM(stringArret: string[]){

   //set time
   let dureeMS = Number(stringArret[stringArret.length-1])
   var heures = Math.floor(dureeMS / 3600);
   var minutes = Math.floor(dureeMS % 3600 / 60);
   var seconds = Math.floor(dureeMS % 3600 % 60);
   this.dureeTrajet =  `${heures}:${minutes<10 ? '0'+minutes : minutes}:${seconds<10?'0'+seconds:seconds}`
   

    let list :Arrete[]= []
    this.ctx.clearRect
    this.ctx.clearRect(0, 0,  this.ctx.canvas.width,  this.ctx.canvas.height)
    for(let i = 0 ; i<stringArret.length;i++){
      if(!this.acpmDo)
        return
      if(!this.modeSpeed)
        await this.delay(50)
      if(stringArret[i].split(';')[2]!= undefined ){

        list.push({station1:stringArret[i].split(';')[1].trim(),id1: Number(stringArret[i].split(';')[0].trim()),id2: Number(stringArret[i].split(';')[3].trim()),  station2:stringArret[i].split(';')[4].trim(),pixel1:stringArret[i].split(';')[2].trim(),pixel2:stringArret[i].split(';')[5].trim(),ligne:stringArret[i].split(';')[6].trim()})
        this.ctx.beginPath()
        this.ctx.strokeStyle = this.getCouleurLigne(list[list.length-1].ligne) as string;
       
        this.ctx.lineWidth=5
        this.ctx.moveTo(Number(list[list.length-1].pixel1.split('/')[0]),Number(list[list.length-1].pixel1.split('/')[1]));
        this.ctx.lineTo(Number(list[list.length-1].pixel2.split('/')[0]),Number(list[list.length-1].pixel2.split('/')[1]));
        this.ctx.stroke(); 
        
      }
    }
   
    

   
  }


  async setListArreteWithSleep(stringArret: string[]){
    this.listArrete = []
    this.ctx.clearRect
    this.ctx.clearRect(0, 0,  this.ctx.canvas.width,  this.ctx.canvas.height)
    for(let i = 0 ; i<stringArret.length;i++){
      console.log(stringArret[i])

     if(!this.searchDo)
        return

        if(stringArret[i].split(';')[2]!= undefined ){

          this.listArrete.push({station1:stringArret[i].split(';')[1].trim(),id1: Number(stringArret[i].split(';')[0].trim()),id2: Number(stringArret[i].split(';')[3].trim()),  station2:stringArret[i].split(';')[4].trim(),pixel1:stringArret[i].split(';')[2].trim(),pixel2:stringArret[i].split(';')[5].trim(),ligne:stringArret[i].split(';')[6].trim()})

              if(!this.exist(this.listArrete[this.listArrete.length-1].station1,this.listArrete[this.listArrete.length-1].ligne))
                this.listeGareToStop.push({name:this.listArrete[this.listArrete.length-1].station1, ligne:this.getLigneLogo(this.listArrete[this.listArrete.length-1].ligne)})
      
              if(this.listArrete[this.listArrete.length-1].station1 === this.listArrete[this.listArrete.length-1].station2)
                this.listeGareToStop.push({name:'Changement de ligne', ligne:'changement'})
      
            if(!this.exist(this.listArrete[this.listArrete.length-1].station1,this.listArrete[this.listArrete.length-1].ligne)){
              this.listeGareToStop.push({name:this.listArrete[this.listArrete.length-1].station2, ligne:this.getLigneLogo(this.listArrete[this.listArrete.length-1].ligne)})

         
        }
      }
    }
    this.listeGareToStop.push({name:this.listArrete[this.listArrete.length-1].station2, ligne:this.getLigneLogo(this.listArrete[this.listArrete.length-1].ligne)})

    for(let i = 0 ; i<stringArret.length;i++){
      if(!this.searchDo)
         return
 
       if(!this.modeSpeed)
        await this.delay(150)
 
         if(stringArret[i].split(';')[2]!= undefined ){
            this.ctx.beginPath()
           this.ctx.strokeStyle = this.getCouleurLigne(this.listArrete[i].ligne) as string;
           if(this.searchDo)
             this.ctx.lineWidth=7
           else
               this.ctx.lineWidth=2
           
               this.ctx.moveTo(Number(this.listArrete[i].pixel1.split('/')[0]),Number(this.listArrete[i].pixel1.split('/')[1]));
               this.ctx.lineTo(Number(this.listArrete[i].pixel2.split('/')[0]),Number(this.listArrete[i].pixel2.split('/')[1]));
               this.ctx.stroke(); 

       }
     }

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


onCheckBoxChanged(){
  this.modeSpeed=!this.modeSpeed
}
}

