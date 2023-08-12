import { Component, OnInit } from '@angular/core';
import { MetroServiceService } from '../metro-service.service';

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css']
})
export class PopUpMessageComponent implements OnInit {

  isConnexe! : boolean
  text: String = "Chargement de la recherche : Arbre connexe ;"
  constructor(private service: MetroServiceService) { }

 async ngOnInit() {
     await this.service.IsConnex().then((data) => {
      this.isConnexe= data
      if(this.isConnexe)
        this.text = "L'arbre est connexe !"
      else
        this.text = "L'arbre n'est pas connexe !"
   })
  }

}
