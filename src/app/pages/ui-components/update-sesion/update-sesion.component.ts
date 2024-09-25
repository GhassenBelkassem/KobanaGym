import { Component } from '@angular/core';

@Component({
  selector: 'app-update-sesion',
  templateUrl: './update-sesion.component.html',
  styleUrl: './update-sesion.component.scss'
})
export class UpdateSesionComponent {
  x = false;
  y = true;
  update(){
    console.log(this.x);
    this.x=true;
    console.log(this.x);
  }

}
