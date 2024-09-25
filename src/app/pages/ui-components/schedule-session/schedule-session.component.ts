import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSeanceComponent } from '../add-seance/add-seance.component';
import { UpdateSesionComponent } from '../update-sesion/update-sesion.component';

@Component({
  selector: 'app-schedule-session',
  templateUrl: './schedule-session.component.html',
  styleUrl: './schedule-session.component.scss'
})
export class ScheduleSessionComponent {
  readonly dialog = inject(MatDialog);
  addSeance() {
    const dialogRef = this.dialog.open(UpdateSesionComponent, {
      width: '60%', // Adjust the width as needed
      maxWidth: '90vw', // Optional: Set a max width relative to viewport width
      height:'60%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
